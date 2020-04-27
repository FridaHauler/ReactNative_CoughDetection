import {computed, observable} from 'mobx';
import {dateTimeNow} from '../utils';
import AudioRecord from 'react-native-audio-record';
import {getRemoteSettingAsNumber} from '../remoteSettings';
import {accelerometer, gyroscope, magnetometer, SensorTypes, setUpdateIntervalForType} from 'react-native-sensors';
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

type SensorData = {
	x: number;
	y: number;
	z: number;
	timestamp: string;
};

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
	@computed get nextAction(): Action | null {
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
		return null;
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
	private play(sound: Sound): Promise<void> {
		return new Promise((resolve, reject) => {
			sound.play((success) => {
				if (success) {
					console.log(`${logIdentifier} playback succeeded!`);
					resolve();
				} else {
					const msg = 'playback failed due to audio decoding errors';
					console.log(logIdentifier, msg);
					reject(msg);
				}
			});
		});
	}
	private beepSound: Sound | undefined;
	private async beep() {
		if (this.beepSound) {
			return this.play(this.beepSound);
		}
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

		await AudioRecord.init({
			sampleRate: getRemoteSettingAsNumber('sampleRate'), // default 44100
			channels: getRemoteSettingAsNumber('channels'), // 1 or 2, default 1
			bitsPerSample: getRemoteSettingAsNumber('bitsPerSample'), // 8 or 16, default 16
			audioSource: getRemoteSettingAsNumber('audioSource'), // android only
			wavFile: 'recoding.wav', // default 'audio.wav'
		});
		AudioRecord.on('data', this.handleAudioRecordingCallback.bind(this));

		setUpdateIntervalForType(SensorTypes.accelerometer, getRemoteSettingAsNumber('accelerometerInterval'));
		setUpdateIntervalForType(SensorTypes.gyroscope, getRemoteSettingAsNumber('gyroscopeInterval'));
		setUpdateIntervalForType(SensorTypes.magnetometer, getRemoteSettingAsNumber('magnetometerInterval'));

		Sound.setCategory('Playback');
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
		this.recordingSeconds = dateTimeNow() - this.startRecordingTimestamp;
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

		AudioRecord.start();
	}
	async stopRecording() {
		this.recordedAudioPath = await AudioRecord.stop();
		this.stopRecordingTimestamp = dateTimeNow();

		this.accelerometerSubscription.unsubscribe();
		this.gyroscopeSubscription.unsubscribe();
		this.magnetometerSubscription.unsubscribe();

		// TODO: not working in iOS, check why??
		// this.recordedAudioSound = await this.getSoundFile(this.recordedAudioPath);

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
