import React from 'react';
import {StackNavigationProps} from '../screens';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import styles from '../styles';

const Home = ({navigation}: StackNavigationProps) => {
	return (
		<SafeAreaView style={styles.container}>
			<View>
				<Text style={styles.text}>Dear Data Donator,</Text>
				<Text style={styles.textParagraph}>Many thanks for participating in our data collection.</Text>
				<Text style={styles.textParagraph}>
					A recording will run for 60 seconds and you will perform an “action” every 10 seconds.
				</Text>
				<Text style={styles.text}>
					You will be asked to define the 5 actions, you will perform during the recoding.
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
		</SafeAreaView>
	);
};
export default Home;
