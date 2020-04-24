import {Platform} from 'react-native';
import * as deviceInfoLib from 'react-native-device-info';

// App Specific
export const AppName = deviceInfoLib.getApplicationName();
export const AppDisplayName = require('../app.json').displayName;
export const AppVersion = deviceInfoLib.getReadableVersion();

// Platform
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

// Date Time methods
export function dateTimeNow() {
	return Math.round(Date.now()); // seconds
}
export function dateTimeParse(date: string | null) {
	return date !== null ? Date.parse(date) : null; // seconds
}
export function dateTimeToLocale(date: number) {
	return new Date(date).toLocaleString();
}
