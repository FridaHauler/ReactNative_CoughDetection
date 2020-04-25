import {computed, observable} from 'mobx';
import {dateTimeNow} from '../utils';
import AudioRecord from 'react-native-audio-record';
import {getRemoteSettingAsNumber} from '../remoteSettings';
import {accelerometer, gyroscope, magnetometer, SensorTypes, setUpdateIntervalForType} from 'react-native-sensors';

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

	@observable startRecordingTimestamp = 0;
	@observable stopRecordingTimestamp = 0;

	recordingTimer: number | undefined;
	@observable recordingSeconds = 0;
	@computed get nextAction(): Action | null {
		if (this.recordingSeconds < 0) {
			return this.actions[0];
		}
		for (const x of this.actions) {
			if (x.triggerStart > this.recordingSeconds) {
				return x;
			}
		}
		return null;
	}

	recordedAudio: string | undefined;
	gyroscopeSubscription: any;
	recordedGyroscope: SensorData[] = [];
	accelerometerSubscription: any;
	recordedAccelerometer: SensorData[] = [];
	magnetometerSubscription: any;
	recordedMagnetometer: SensorData[] = [];

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

		for (let x = 1; x <= getRemoteSettingAsNumber('totalActions'); x++) {
			this.actions = this.actions.concat(new Action(getRemoteSettingAsNumber('actionEvery') * x));
		}

		AudioRecord.init(options);

		setUpdateIntervalForType(SensorTypes.accelerometer, getRemoteSettingAsNumber('accelerometerInterval'));
		setUpdateIntervalForType(SensorTypes.gyroscope, getRemoteSettingAsNumber('gyroscopeInterval'));
		setUpdateIntervalForType(SensorTypes.magnetometer, getRemoteSettingAsNumber('magnetometerInterval'));
	}

	scheduleStart() {
		if (this.recordingTimer) {
			clearInterval(this.recordingTimer);
		}
		this.recordingSeconds = this.startRecordingIn;
		this.recordingTimer = setInterval(async () => {
			this.recordingSeconds++;
			if (this.recordingSeconds === 0) {
				await this.startRecording();
			}
			if (this.recordingSeconds >= this.maxRecordingTime) {
				await this.stopRecording();
			}
		}, 1000);
	}

	private startRecording() {
		this.stopRecordingTimestamp = 0;
		this.startRecordingTimestamp = dateTimeNow();
		AudioRecord.on('data', (data) => {
			this.recordedAudio += data;
		});
		this.accelerometerSubscription = accelerometer.subscribe(
			({x, y, z, timestamp}) => this.recordedAccelerometer.push({x, y, z, timestamp}),
			(error) => console.log(error),
		);
		this.gyroscopeSubscription = gyroscope.subscribe(
			({x, y, z, timestamp}) => this.recordedGyroscope.push({x, y, z, timestamp}),
			(error) => console.log(error),
		);
		this.magnetometerSubscription = magnetometer.subscribe(
			({x, y, z, timestamp}) => this.recordedMagnetometer.push({x, y, z, timestamp}),
			(error) => console.log(error),
		);
		AudioRecord.start();
	}
	async stopRecording() {
		this.accelerometerSubscription.unsubscribe();
		this.gyroscopeSubscription.unsubscribe();
		this.magnetometerSubscription.unsubscribe();

		if (this.recordingTimer) {
			clearInterval(this.recordingTimer);
		}
		this.stopRecordingTimestamp = dateTimeNow();
		const file = await AudioRecord.stop();
		console.log(file);
		console.log(this.recordedAccelerometer);
		console.log(this.recordedGyroscope);
		console.log(this.recordedMagnetometer);
	}

	clean() {
		this.recordedAccelerometer = [];
		this.recordedMagnetometer = [];
		this.recordedGyroscope = [];
		this.recordedAudio = undefined;
	}
}
export default new Model();
