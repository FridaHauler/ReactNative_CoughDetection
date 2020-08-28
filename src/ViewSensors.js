import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import RNSensors from 'react-native-sensors';
const {Accelerometer, Gyroscope} = RNSensors;

const accelerationObservable = new Accelerometer({
	updateInterval: 2000, // defaults to 100ms
});

const gyroscopeObservable = new Gyroscope({
	updateInterval: 2000, // defaults to 100ms
});

export default class ViewSensors extends Component {
	constructor(props) {
		super(props);
		this.state = {
			acceleration: {
				x: 'unknown',
				y: 'unknown',
				z: 'unknown',
			},
			gyroscope: {
				x: 'unknown',
				y: 'unknown',
				z: 'unknown',
			},
		};
	}

	componentWillMount() {
		accelerationObservable.subscribe((acceleration) =>
			this.setState({
				acceleration,
			}),
		);

		gyroscopeObservable.subscribe((gyroscope) =>
			this.setState({
				gyroscope,
			}),
		);
	}

	componentWillUnmount() {
		accelerationObservable.stop();
		gyroscopeObservable.stop();
	}

	render() {
		const {acceleration, gyroscope} = this.state;

		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>Acceleration</Text>
				<Text style={styles.instructions}>X: {parseFloat(acceleration.x).toFixed(2)}</Text>
				<Text style={styles.instructions}>Y: {parseFloat(acceleration.y).toFixed(2)}</Text>
				<Text style={styles.instructions}>Z: {parseFloat(acceleration.z).toFixed(2)}</Text>
				<Text style={styles.welcome}>Gyroscope</Text>
				<Text style={styles.instructions}>X: {parseFloat(gyroscope.x).toFixed(2)}</Text>
				<Text style={styles.instructions}>Y: {parseFloat(gyroscope.y).toFixed(2)}</Text>
				<Text style={styles.instructions}>Z: {parseFloat(gyroscope.z).toFixed(2)}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
});
