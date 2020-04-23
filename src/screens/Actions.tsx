import React from 'react';
import {StackNavigationProps} from '../screens';
import {SafeAreaView, Text, TouchableOpacity} from 'react-native';
import styles from '../styles';

const Actions = ({navigation}: StackNavigationProps) => {
	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Please define the actions</Text>

			<TouchableOpacity
				style={styles.continueButton}
				onPress={() => {
					navigation.navigate('MetaInformation');
				}}>
				<Text style={styles.continueButtonText}>Continue</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};
export default Actions;
