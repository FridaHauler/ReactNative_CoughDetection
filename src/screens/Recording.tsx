import React from 'react';
import {StackNavigationProps} from '../screens';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from '../styles';
import {simpleCounter} from '../utils';
import Model from '../model/Model';
import {observer} from 'mobx-react-lite';

const Recording = observer(({navigation}: StackNavigationProps) => {
	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.title}>Recording in progress</Text>
			</View>

			<View style={styles.middlePanel}>
				<View>
					<Text style={styles.recordingText}>{Model.recordingSeconds < 0 ? 'recoding in' : 'Total Time'}</Text>
					<Text style={styles.totalTime}>{simpleCounter(Math.abs(Model.recordingSeconds))}</Text>
				</View>

				{Model.recordingSeconds >= Model.maxRecordingTime ? (
					<View style={styles.recordingStatusContainer}>
						<Text style={styles.recordingStatusText}>Recording finished</Text>
					</View>
				) : (
					<View />
				)}

				{Model.nextAction && Model.recordingSeconds >= 0 ? (
					<View>
						<Text style={styles.recordingText}>Next Action</Text>
						<View style={styles.recordingStatusContainer}>
							<Text style={styles.recordingText}>{Model.nextAction.selectedAction}</Text>
						</View>
						<Text style={styles.recordingText}>in</Text>
						<Text style={styles.secondaryTime}>
							{simpleCounter(Model.nextAction.triggerStart - Model.recordingSeconds)}
						</Text>
						<Text style={styles.recordingText}>seconds</Text>
					</View>
				) : (
					<View />
				)}
			</View>

			{Model.recordingSeconds >= Model.maxRecordingTime ? (
				<TouchableOpacity
					style={styles.continueButton}
					onPress={() => {
						navigation.navigate('Home');
					}}>
					<Text style={styles.continueButtonText}>Send data</Text>
				</TouchableOpacity>
			) : (
				<View />
			)}
		</View>
	);
});
export default Recording;
