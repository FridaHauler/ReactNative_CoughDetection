import {check, Permission, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {isIOS} from './utils';

export async function requestPermission(permission: Permission) {
	let status = await check(permission);
	return status !== RESULTS.GRANTED ? await request(permission) : status;
}

const logIdentifier = '+ [Permissions]';
export async function acquireRecordPermissions() {
	try {
		let status;
		if (isIOS) {
			status = await requestPermission(PERMISSIONS.IOS.MICROPHONE);
		} else {
			status = await requestPermission(PERMISSIONS.ANDROID.RECORD_AUDIO);
		}
		console.log(`${logIdentifier} Audio permission was ${status}`);
	} catch (e) {
		console.log(`${logIdentifier} Error while requesting permissions`, e);
	}
}

export async function acquireMotionPermissions() {
	try {
		let status;
		if (isIOS) {
			status = await requestPermission(PERMISSIONS.IOS.MOTION);
		} else {
			status = await requestPermission(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION);
		}
		console.log(`${logIdentifier} Motion permission was ${status}`);
	} catch (e) {
		console.log(`${logIdentifier} Error while requesting permissions`, e);
	}
}
