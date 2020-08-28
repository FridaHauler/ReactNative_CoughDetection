import React from 'react';
import {StackNavigationProps} from '../screens';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import styles from '../styles';
import Model from '../model/Model';
import deviceInfo from '../deviceInfo';

const Home = ({navigation}: StackNavigationProps) => {
	return (
		<View style={styles.container}>
			<ScrollView>
				<View style={styles.insideContainer}>
					<Text style={styles.text}>Dear Volunteer,</Text>
					<Text style={styles.textParagraph}>Thank you for participating in our cough signal data collection.</Text>
					<Text style={styles.textParagraph}>
						There are two options, 1) a cough recording - taking up to {Model.maxRecordingTime} seconds when you may
						perform a predefined “action” every {Model.actionEvery} seconds. 2) a cough classification based on a
						pre-trained model.
					</Text>
					<Text style={styles.text}>
						During the Recording (1st option) you will be asked to for some additional information about your position
						(sitting vs. standing), the location of your smart phone (trouser pocket vs. jacket pocket) and if you are
						going to be quiet between actions or if you are talking.
					</Text>
					<Text style={styles.text}>
						During the Classification (2nd) part, at your cough the device will give a feedback if the action was
						classified as a cough or not.
					</Text>
					<Text style={styles.textParagraph}>
						Your device unique identifier, persisted between installations, is {deviceInfo.uniqueID}
					</Text>
				</View>
			</ScrollView>
			<TouchableOpacity
				style={styles.continueButton}
				onPress={() => {
					navigation.navigate('Actions');
				}}>
				<Text style={styles.continueButtonText}>Continue to recording</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.continueButton}
				onPress={() => {
					navigation.navigate('CoughClassifier');
				}}>
				<Text style={styles.continueButtonText}>Cough Classification</Text>
			</TouchableOpacity>
		</View>
	);
};
export default Home;
