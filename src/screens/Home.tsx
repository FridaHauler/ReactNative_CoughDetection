import React from 'react';
import {StackNavigationProps} from '../screens';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from '../styles';
import Model from '../model/Model';

const Home = ({navigation}: StackNavigationProps) => {
	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.text}>Dear Data Donator,</Text>
				<Text style={styles.textParagraph}>Many thanks for participating in our data collection.</Text>
				<Text style={styles.textParagraph}>
					A recording will run for {Model.maxRecordingTime} seconds and you will perform an “action” every{' '}
					{Model.actionEvery} seconds.
				</Text>
				<Text style={styles.text}>
					You will be asked to define the {Model.totalActions} actions, you will perform during the recoding.
				</Text>
				<Text style={styles.textParagraph}>
					In addition, you will be asked to for some additional information about your position (sitting vs. standing),
					the location of your smart phone (trouser pocket vs. jacket pocket) and if you are going to be quiet between
					actions or if you are talking.
				</Text>
				<Text style={styles.textParagraph}>
					To trigger the actions, this app will allow you to mirror the screen to another monitor via Apple TV.
				</Text>
			</View>
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
