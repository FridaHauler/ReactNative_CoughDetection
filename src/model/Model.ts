import {computed, observable} from 'mobx';
import {dateTimeNow} from '../utils';
import {getRemoteSettingAsBoolean, getRemoteSettingAsNumber} from '../remoteSettings';
import {
	accelerometer,
	gyroscope,
	magnetometer,
	SensorData,
	SensorTypes,
	setUpdateIntervalForType,
} from 'react-native-sensors';
import AudioRecorder from 'react-native-audio-record';
import Sound from 'react-native-sound';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import deviceInfo from '../deviceInfo';

const logIdentifier = '+ [Model]';
export class Action {
	triggerStart: number = 0;
	@observable selectedAction: string | null = null;

	constructor(start: number) {
		this.triggerStart = start;
	}
}

class Model {
	@observable selectedPosition = 0;
	positions = ['sitting', 'standing'];
	@observable selectedLocation = 0;
	locations = ['pocket', 'jacket'];
	@observable selectedTalking = 0;
	talking = ['yes', 'no'];
	@observable selectableActions = ['Single cough', 'Short laughing', 'Multiple coughs', 'Clear throat'];
	@observable actions: Action[] = [];

	startRecordingIn = 0;
	maxRecordingTime = 0;
	totalActions = 0;
	actionEvery = 0;
	beepBefore = 0;

	@observable startRecordingTimestamp = 0;
	@observable stopRecordingTimestamp = 0;
	@observable isSendingData = false;

	@observable recordingSeconds = 0;
	@computed get nextAction(): Action | undefined {
		if (this.recordingSeconds < 0) {
			return this.actions[0];
		}
		for (const x of this.actions) {
			if (x.triggerStart - this.beepBefore === this.recordingSeconds) {
				this.beep().catch(console.log);
			}
			if (x.triggerStart > this.recordingSeconds) {
				return x;
			}
		}
	}

	@observable recordedAudioPath: string | undefined;
	@observable recordedAudioSound: Sound | undefined;
	//collectedAudio: Buffer | undefined;
	gyroscopeSubscription: any;
	recordedGyroscope: SensorData[] = [];
	accelerometerSubscription: any;
	recordedAccelerometer: SensorData[] = [];
	magnetometerSubscription: any;
	recordedMagnetometer: SensorData[] = [];

	private getSoundFile(file: string, path: string = Sound.MAIN_BUNDLE): Promise<Sound> {
		return new Promise((resolve, reject) => {
			if (!file) {
				const msg = 'file path is empty';
				console.log(logIdentifier, msg);
				return reject(msg);
			}
			const sound: Sound = new Sound(file, path, (error) => {
				if (error) {
					console.log(`${logIdentifier} failed to load the file`, error);
					return reject(error);
				}
				return resolve(sound);
			});
		});
	}
	private beepSound: Sound | undefined;
	private beep() {
		return new Promise((resolve, reject) => {
			if (!getRemoteSettingAsBoolean('beepEnabled')) {
				return resolve();
			}

			Sound.setCategory('PlayAndRecord', true);
			Sound.setMode('VideoChat');
			Sound.setActive(true);
			this.beepSound?.play((success) => {
				if (success) {
					console.log(`${logIdentifier} beep!`);
					resolve();
				} else {
					const msg = 'playback failed due to audio decoding errors';
					console.log(logIdentifier, msg);
					reject(msg);
				}
			});
		});
	}

	async init() {
		this.startRecordingIn = getRemoteSettingAsNumber('startRecordingIn');
		this.maxRecordingTime = getRemoteSettingAsNumber('totalRecordingTime');
		this.totalActions = getRemoteSettingAsNumber('totalActions');
		this.actionEvery = getRemoteSettingAsNumber('actionEvery');
		this.beepBefore = getRemoteSettingAsNumber('beepBefore');

		for (let x = 1; x <= getRemoteSettingAsNumber('totalActions'); x++) {
			this.actions = this.actions.concat(new Action(getRemoteSettingAsNumber('actionEvery') * x));
		}

		await AudioRecorder.init({
			sampleRate: getRemoteSettingAsNumber('sampleRate'), // default 44100
			channels: getRemoteSettingAsNumber('channels'), // 1 or 2, default 1
			bitsPerSample: getRemoteSettingAsNumber('bitsPerSample'), // 8 or 16, default 16
			audioSource: getRemoteSettingAsNumber('audioSource'), // android only
			wavFile: 'recoding.wav', // default 'audio.wav'
		});
		AudioRecorder.on('data', this.handleAudioRecordingCallback.bind(this));

		setUpdateIntervalForType(SensorTypes.accelerometer, getRemoteSettingAsNumber('accelerometerInterval'));
		setUpdateIntervalForType(SensorTypes.gyroscope, getRemoteSettingAsNumber('gyroscopeInterval'));
		setUpdateIntervalForType(SensorTypes.magnetometer, getRemoteSettingAsNumber('magnetometerInterval'));

		this.beepSound = await this.getSoundFile('beep.mp3');
	}

	delayedStart() {
		this.recordingSeconds = this.startRecordingIn;
		const recordingTimer = setInterval(async () => {
			this.recordingSeconds++;
			await this.beep();
			if (this.recordingSeconds === 0) {
				if (recordingTimer) {
					clearInterval(recordingTimer);
				}
				await this.startRecording();
			}
		}, 1000);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	private async handleAudioRecordingCallback(data: string) {
		/*const buffer = Buffer.from(data, 'base64');
		if (!this.collectedAudio) {
			this.collectedAudio = buffer;
		} else {
			this.collectedAudio = Buffer.concat([this.collectedAudio, buffer]);
		}
		*/
		// update time
		this.recordingSeconds = Math.round((dateTimeNow() - this.startRecordingTimestamp) / 1000);
		if (this.recordingSeconds >= this.maxRecordingTime) {
			await this.stopRecording();
		}
	}

	private startRecording() {
		this.clean();
		this.startRecordingTimestamp = dateTimeNow();

		this.accelerometerSubscription = accelerometer.subscribe(
			({x, y, z, timestamp}) => this.recordedAccelerometer.push({x, y, z, timestamp}),
			(error) => console.log(logIdentifier, error),
		);
		this.gyroscopeSubscription = gyroscope.subscribe(
			({x, y, z, timestamp}) => this.recordedGyroscope.push({x, y, z, timestamp}),
			(error) => console.log(logIdentifier, error),
		);
		this.magnetometerSubscription = magnetometer.subscribe(
			({x, y, z, timestamp}) => this.recordedMagnetometer.push({x, y, z, timestamp}),
			(error) => console.log(logIdentifier, error),
		);

		AudioRecorder.start();
	}
	async stopRecording() {
		this.recordedAudioPath = await AudioRecorder.stop();
		this.stopRecordingTimestamp = dateTimeNow();

		this.accelerometerSubscription.unsubscribe();
		this.gyroscopeSubscription.unsubscribe();
		this.magnetometerSubscription.unsubscribe();

		this.recordedAudioSound = await this.getSoundFile(this.recordedAudioPath!, '');

		await this.beep();
		await this.beep();
	}

	async sendData() {
		const firestoreRef = await firestore()
			.collection('Recordings')
			.add({
				user: deviceInfo.uniqueID,
				subjectPosition: this.positions[this.selectedPosition],
				phonePosition: this.locations[this.selectedLocation],
				talking: this.talking[this.selectedTalking],
				accelerometer: this.recordedAccelerometer,
				gyroscope: this.recordedGyroscope,
				magnetometer: this.recordedMagnetometer,
				actions: this.actions.map((x) => {
					return {triggerStart: x.triggerStart, selectedAction: x.selectedAction};
				}),
				startTimestamp: this.startRecordingTimestamp,
				stopTimestamp: this.stopRecordingTimestamp,
				audioSampleRate: getRemoteSettingAsNumber('sampleRate'),
				audioChannels: getRemoteSettingAsNumber('channels'),
				audioBitsPerSample: getRemoteSettingAsNumber('bitsPerSample'),
				audioAndroidSource: getRemoteSettingAsNumber('audioSource'),
				audioDuration: this.recordedAudioSound?.getDuration(),
				audioFileFormat: 'wav',
				/*audioRawData: this.collectedAudio
					? firestore.Blob.fromBase64String(this.collectedAudio.toString('base64'))
					: null,*/
				createdAt: firestore.FieldValue.serverTimestamp(),
			});
		console.log('DB ID is:', firestoreRef.id);
		const reference = storage().ref(`${firestoreRef.id}.wav`);
		await reference.putFile(this.recordedAudioPath!);
		const downloadURL = await reference.getDownloadURL();
		console.log('File download url is: ', downloadURL);
		await firestoreRef.update({audioFile: downloadURL});
	}

	clean() {
		this.startRecordingTimestamp = 0;
		this.stopRecordingTimestamp = 0;
		this.recordedAccelerometer = [];
		this.recordedMagnetometer = [];
		this.recordedGyroscope = [];
		//this.collectedAudio = undefined;
		this.recordedAudioSound?.release();
		this.recordedAudioSound = undefined;
		this.recordedAudioPath = undefined;
	}
}
export default new Model();
