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
	return Date.now(); // seconds
}
export function dateTimeParse(date: string | null) {
	return date !== null ? Date.parse(date) : null; // seconds
}
export function dateTimeToLocale(date: number) {
	return new Date(date).toLocaleString();
}
export function simpleCounter(seconds: number) {
	function round(value: number, precision: number = 1) {
		return value.toFixed(precision).replace(/\.0+$/, '');
	}
	if (seconds <= 0) {
		return '00:00';
	}

	const minutes = seconds / 60;
	if (minutes >= 1) {
		return round(minutes).padStart(2, '0') + ':' + (seconds % 60).toString().padStart(2, '0');
	} else if (seconds >= 1) {
		return `00:${seconds.toString().padStart(2, '0')}`;
	}
	return '00:00';
}
