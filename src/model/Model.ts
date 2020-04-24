import {computed, observable} from 'mobx';
import {dateTimeNow} from '../utils';
import AudioRecord from 'react-native-audio-record';
import {getRemoteSettingAsNumber} from "../remoteSettings";

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

	@observable startRecordingTimestamp = 0;
	@observable stopRecordingTimestamp = 0;

	recordingTimer: number | undefined = undefined;
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

	recordedAudio: string | null = null;
	recorderGyro = {};

	async init() {
		const options = { //
			sampleRate: getRemoteSettingAsNumber('sampleRate'), // default 44100
			channels: getRemoteSettingAsNumber('channel'), // 1 or 2, default 1
			bitsPerSample: getRemoteSettingAsNumber('bitsPerSample'), // 8 or 16, default 16
			audioSource: getRemoteSettingAsNumber('audioSource'), // android only
			wavFile: 'recoding.wav', // default 'audio.wav'
		};
		AudioRecord.init(options);

		this.startRecordingIn = getRemoteSettingAsNumber('startRecordingIn');
		this.maxRecordingTime = getRemoteSettingAsNumber('totalRecordingTime');
		this.totalActions = getRemoteSettingAsNumber('totalActions');
		this.actionEvery = getRemoteSettingAsNumber('actionEvery');

		for (let x = 1; x <= getRemoteSettingAsNumber('totalActions'); x++) {
			this.actions = this.actions.concat(new Action(getRemoteSettingAsNumber('actionEvery') * x));
		}
	}

	async startRecording() {
		if (this.recordingTimer) {
			clearInterval(this.recordingTimer);
		}
		this.recordingSeconds = this.startRecordingIn;
		this.recordingTimer = setInterval(() => {
			this.recordingSeconds++;
			if (this.recordingSeconds === 0) {
				this.stopRecordingTimestamp = 0;
				this.startRecordingTimestamp = dateTimeNow();
				AudioRecord.on('data', (data) => {
					this.recordedAudio += data;
				});
				AudioRecord.start();
			}
			if (this.recordingSeconds >= this.maxRecordingTime) {
				this.stopRecording();
			}
		}, 1000);
	}
	async stopRecording() {
		if (this.recordingTimer) {
			clearInterval(this.recordingTimer);
		}
		this.stopRecordingTimestamp = dateTimeNow();
		const file = await AudioRecord.stop();
		console.log(file);
	}
}
export default new Model();
