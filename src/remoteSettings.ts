import remoteConfig from '@react-native-firebase/remote-config';

export async function init() {
	// Load default remote config firebase settings
	await remoteConfig().setDefaults({
		totalActions: 5,
		actionEvery: 10,
		beepBefore: 1,
		totalRecordingTime: 60,
		startRecordingIn: -5,
		sampleRate: 16000,
		channels: 1,
		bitsPerSample: 16,
		audioSource: 6,
		accelerometerInterval: 100,
		gyroscopeInterval: 100,
		magnetometerInterval: 100,
	});
	await remoteConfig().setConfigSettings({
		minimumFetchInterval: 300, // 5 min
		isDeveloperModeEnabled: false,
	});
	await remoteConfig().fetchAndActivate();
}

export function getRemoteSettingAsNumber(key: string) {
	return remoteConfig().getValue(key).value as number;
}
export function getRemoteSettingAsString(key: string) {
	return remoteConfig().getValue(key).value as string;
}
