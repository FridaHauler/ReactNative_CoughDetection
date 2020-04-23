import React from 'react';
import {StackNavigationProps} from "../screens";
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import styles from "../styles";

const Recording = ({navigation}: StackNavigationProps) => {
	return (
		<SafeAreaView style={styles.container}>
			<View>
				<Text style={styles.title}>Recording in progress</Text>
			</View>

			<View style={styles.centerContainer}>
			</View>

			<Text style={styles.title}>The recoding will start with a 5 sec delay after you press the start bottom to allow for placement of your mobile in your pocket/jacket.</Text>
	</SafeAreaView>
	);
};
export default Recording;
