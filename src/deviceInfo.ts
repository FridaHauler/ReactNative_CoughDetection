import * as deviceInfoLib from 'react-native-device-info';
import {DeviceType} from 'react-native-device-info/lib/typescript/internal/types';
import {Platform} from "react-native";

interface DeviceInfo {
	uniqueID: string;
	notificationToken: string;
	apnsToken: string | null;
	applicationName: string;
	applicationVersion: string;
	deviceType: DeviceType;
	deviceBrand: string;
	deviceName: string;
	systemName: string;
	systemVersion: string;
	isEmulator: boolean;
	batteryLevel: () => number;
}

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

// @ts-ignore -- temporary situation before initialization
const deviceInfo: DeviceInfo = {};
export async function init() {
	deviceInfo.uniqueID = deviceInfoLib.getUniqueId();
	deviceInfo.applicationName = deviceInfoLib.getApplicationName();
	deviceInfo.applicationVersion = deviceInfoLib.getReadableVersion();
	deviceInfo.deviceType = await deviceInfoLib.getDeviceType();
	deviceInfo.deviceBrand = deviceInfoLib.getBrand();
	deviceInfo.deviceName = await deviceInfoLib.getDeviceName();
	deviceInfo.systemName = deviceInfoLib.getSystemName();
	deviceInfo.systemVersion = deviceInfoLib.getSystemVersion();
	deviceInfo.isEmulator = await deviceInfoLib.isEmulator();
	deviceInfo.batteryLevel = deviceInfoLib.getBatteryLevelSync;
}
export default deviceInfo;
