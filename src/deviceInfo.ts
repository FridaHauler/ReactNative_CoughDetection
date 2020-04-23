import * as deviceInfoLib from 'react-native-device-info';
import {DeviceType} from 'react-native-device-info/lib/typescript/internal/types';

interface DeviceInfo {
	uniqueID: string;
	deviceType: DeviceType;
	deviceBrand: string;
	deviceName: string;
	systemName: string;
	systemVersion: string;
	isEmulator: boolean;
	batteryLevel: () => number;
}

// @ts-ignore -- temporary situation before initialization
const deviceInfo: DeviceInfo = {};
export async function init() {
	deviceInfo.uniqueID = deviceInfoLib.getUniqueId();
	deviceInfo.deviceType = await deviceInfoLib.getDeviceType();
	deviceInfo.deviceBrand = deviceInfoLib.getBrand();
	deviceInfo.deviceName = await deviceInfoLib.getDeviceName();
	deviceInfo.systemName = deviceInfoLib.getSystemName();
	deviceInfo.systemVersion = deviceInfoLib.getSystemVersion();
	deviceInfo.isEmulator = await deviceInfoLib.isEmulator();
	deviceInfo.batteryLevel = deviceInfoLib.getBatteryLevelSync;
}
export default deviceInfo;
