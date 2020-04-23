import React from 'react';
import {StackNavigationProps} from '../screens';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import styles from '../styles';

const StartRecording = ({navigation}: StackNavigationProps) => {
	return (
		<SafeAreaView style={styles.container}>
			<View>
				<Text style={styles.title}>Please start the recording</Text>
				<TouchableOpacity
					style={styles.continueButton}
					onPress={() => {
						navigation.navigate('Home');
					}}>
					<Text style={styles.continueButtonText}>Mirror Screen</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.centerContainer}>
				<TouchableOpacity
					style={styles.startButton}
					onPress={() => {
						navigation.navigate('Recording');
					}}>
					<Text style={styles.startText}>Start</Text>
				</TouchableOpacity>
			</View>

			<Text style={styles.title}>
				The recoding will start with a 5 sec delay after you press the start bottom to allow for placement of your
				mobile in your pocket/jacket.
			</Text>
		</SafeAreaView>
	);
};
export default StartRecording;
