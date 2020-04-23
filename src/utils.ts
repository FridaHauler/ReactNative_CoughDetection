// Date Time methods
export function dateTimeNow() {
	return Math.round(Date.now() / 1000); // seconds
}
export function dateTimeParse(date: string | null) {
	return date !== null ? Date.parse(date) / 1000 : null; // seconds
}

export function prettyDuration(seconds: number) {
	function round(value: number, precision: number = 1) {
		return value.toFixed(precision).replace(/\.0+$/, '');
	}

	const minutes = seconds / 60;
	const hours = seconds / 3600;
	if (hours >= 1) {
		return round(hours) + ' hour' + (hours > 1 ? 's' : '');
	} else if (minutes >= 1) {
		return round(minutes) + ' minute' + (minutes > 1 ? 's' : '');
	} else if (seconds >= 1) {
		return seconds + ' second' + (seconds > 1 ? 's' : '');
	}

	throw new Error('Unable to prettify');
}
