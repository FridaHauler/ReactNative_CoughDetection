import {computed, observable} from 'mobx';
import {dateTimeNow} from '../utils';
import AudioRecord from 'react-native-audio-record';
import {getRemoteSettingAsNumber} from '../remoteSettings';
import {accelerometer, gyroscope, magnetometer, SensorTypes, setUpdateIntervalForType} from 'react-native-sensors';
import {Buffer} from 'buffer';
import Sound from 'react-native-sound';

const logIdentifier = '+ [Model]';
export class Action {
	triggerStart: number = 0;
	@observable selectedAction: string | null = null;

	constructor(start: number) {
		this.triggerStart = start;
	}
}

interface SensorData {
	x: number;
	y: number;
	z: number;
	timestamp: string;
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

	recordingTimer: number | undefined;
	@observable recordingSeconds = 0;
	@computed get nextAction(): Action | null {
		if (this.recordingSeconds < 0) {
			return this.actions[0];
		}
		for (const x of this.actions) {
			if (x.triggerStart - this.beepBefore === this.recordingSeconds) {
				this.playBeep().catch(console.log);
			}
			if (x.triggerStart > this.recordingSeconds) {
				return x;
			}
		}
		return null;
	}

	collectedAudio: Buffer | undefined;
	gyroscopeSubscription: any;
	recordedGyroscope: SensorData[] = [];
	accelerometerSubscription: any;
	recordedAccelerometer: SensorData[] = [];
	magnetometerSubscription: any;
	recordedMagnetometer: SensorData[] = [];

	private beep = new Sound('beep.mp3', Sound.MAIN_BUNDLE, (error) => {
		if (error) {
			console.log(`${logIdentifier} failed to load the sound`, error);
			return;
		}
	});
	playBeep() {
		return new Promise((resolve, reject) => {
			this.beep.play((success) => {
				if (success) {
					console.log(`${logIdentifier} beep!`);
					resolve();
				} else {
					console.log(`${logIdentifier} playback failed due to audio decoding errors`);
					reject();
				}
			});
		});
	}

	async init() {
		const options = {
			//
			sampleRate: getRemoteSettingAsNumber('sampleRate'), // default 44100
			channels: getRemoteSettingAsNumber('channel'), // 1 or 2, default 1
			bitsPerSample: getRemoteSettingAsNumber('bitsPerSample'), // 8 or 16, default 16
			audioSource: getRemoteSettingAsNumber('audioSource'), // android only
			wavFile: 'recoding.wav', // default 'audio.wav'
		};

		this.startRecordingIn = getRemoteSettingAsNumber('startRecordingIn');
		this.maxRecordingTime = getRemoteSettingAsNumber('totalRecordingTime');
		this.totalActions = getRemoteSettingAsNumber('totalActions');
		this.actionEvery = getRemoteSettingAsNumber('actionEvery');
		this.beepBefore = getRemoteSettingAsNumber('beepBefore');

		for (let x = 1; x <= getRemoteSettingAsNumber('totalActions'); x++) {
			this.actions = this.actions.concat(new Action(getRemoteSettingAsNumber('actionEvery') * x));
		}

		await AudioRecord.init(options);

		setUpdateIntervalForType(SensorTypes.accelerometer, getRemoteSettingAsNumber('accelerometerInterval'));
		setUpdateIntervalForType(SensorTypes.gyroscope, getRemoteSettingAsNumber('gyroscopeInterval'));
		setUpdateIntervalForType(SensorTypes.magnetometer, getRemoteSettingAsNumber('magnetometerInterval'));

		Sound.setCategory('Playback');
	}

	delayedStart() {
		if (this.recordingTimer) {
			clearInterval(this.recordingTimer);
		}
		this.recordingSeconds = this.startRecordingIn;

		this.recordingTimer = setInterval(async () => {
			this.recordingSeconds++;
			await this.playBeep();
			if (this.recordingSeconds === 0) {
				if (this.recordingTimer) {
					clearInterval(this.recordingTimer);
				}
				await this.startRecording();
			}
		}, 1000);
	}

	private async handleAudioRecordingCallback(data: string) {
		const buffer = Buffer.from(data, 'base64');
		if (!this.collectedAudio) {
			this.collectedAudio = buffer;
		} else {
			this.collectedAudio = Buffer.concat([this.collectedAudio, buffer]);
		}
		console.log(`${logIdentifier} chunk size`, this.collectedAudio.byteLength);

		// update time
		this.recordingSeconds = dateTimeNow() - this.startRecordingTimestamp;
		if (this.recordingSeconds >= this.maxRecordingTime) {
			await this.stopRecording();
		}
	}

	private startRecording() {
		this.stopRecordingTimestamp = 0;
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

		AudioRecord.on('data', this.handleAudioRecordingCallback.bind(this));
		AudioRecord.start();
	}
	async stopRecording() {
		const file = await AudioRecord.stop();
		this.stopRecordingTimestamp = dateTimeNow();

		this.accelerometerSubscription.unsubscribe();
		this.gyroscopeSubscription.unsubscribe();
		this.magnetometerSubscription.unsubscribe();

		console.log(`${logIdentifier} File:`, file);
		console.log(`${logIdentifier} Accelerometer:`, this.recordedAccelerometer);
		//console.log(`${logIdentifier} Base64:`, this.collectedAudio?.toString('base64'));

		await this.playBeep();
		await this.playBeep();
	}

	clean() {
		this.recordedAccelerometer = [];
		this.recordedMagnetometer = [];
		this.recordedGyroscope = [];
		this.collectedAudio = undefined;
	}
}
export default new Model();
