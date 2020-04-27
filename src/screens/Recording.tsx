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
				<View>
					{/*
					<View style={styles.recordedValidateContainer}>
						<TouchableOpacity
							style={styles.recordedValidateButtons}
							onPress={() => {
								Model.recordedAudioSound?.play();
							}}>
							<Image source={require('../assets/icons/play.png')} />
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.recordedValidateButtons}
							onPress={() => {
								Model.recordedAudioSound?.pause();
							}}>
							<Image source={require('../assets/icons/pause.png')} />
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.recordedValidateButtons}
							onPress={() => {
								Model.recordedAudioSound?.stop();
							}}>
							<Image source={require('../assets/icons/stop.png')} />
						</TouchableOpacity>
					</View>
					*/}
					<TouchableOpacity
						style={Model.isSendingData ? styles.continueButtonDisabled : styles.continueButton}
						disabled={Model.isSendingData}
						onPress={async () => {
							Model.isSendingData = true;
							Model.recordedAudioSound?.stop();
							await Model.sendData();
							navigation.navigate('Home');
							Model.isSendingData = false;
						}}>
						<Text style={styles.continueButtonText}>{Model.isSendingData ? 'Sending, please wait' : 'Send data'}</Text>
					</TouchableOpacity>
				</View>
			) : (
				<View />
			)}
		</View>
	);
});
export default Recording;
