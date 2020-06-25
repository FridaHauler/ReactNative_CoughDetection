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
					<Text style={styles.text}>Dear Data Donator,</Text>
					<Text style={styles.textParagraph}>Many thanks for participating in our data collection.</Text>
					<Text style={styles.textParagraph}>
						A recording will run for {Model.maxRecordingTime} seconds and you will perform an “action” every{' '}
						{Model.actionEvery} seconds.
					</Text>
					<Text style={styles.text}>
						You will be asked to define the {Model.totalActions} actions, you will perform during the recoding.
					</Text>
					<Text style={styles.text}>
						In addition, you will be asked to for some additional information about your position (sitting vs.
						standing), the location of your smart phone (trouser pocket vs. jacket pocket) and if you are going to be
						quiet between actions or if you are talking.
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
				<Text style={styles.continueButtonText}>Continue</Text>
			</TouchableOpacity>
		</View>
	);
};
export default Home;
