import remoteConfig from '@react-native-firebase/remote-config';

export async function init() {
	// Load default remote config firebase settings
	await remoteConfig().setDefaults({
		test123: 1,
	});
	await remoteConfig().setConfigSettings({
		minimumFetchInterval: 300, // 5 min
		isDeveloperModeEnabled: false, // uses defaults or fetch
	});
	await remoteConfig().fetchAndActivate();
}

export function getRemoteSettingAsNumber(key: string) {
	return remoteConfig().getValue(key).value as number;
}
export function getRemoteSettingAsString(key: string) {
	return remoteConfig().getValue(key).value as string;
}
