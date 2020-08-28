import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';

import ViewSensors from './ViewSensors';
import DisplaySensorData from './DisplaySensorData';

export default class RNSensorsDisplayView extends Component {
	render() {
		return (
			<ScrollableTabView style={{marginTop: 20}} renderTabBar={() => <DefaultTabBar />}>
				<DisplaySensorData tabLabel={'SensorDisplay'} />
				<ViewSensors tableLabel="ViewSensors" />
			</ScrollableTabView>
		);
	}
}
