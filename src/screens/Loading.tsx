import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {AppDisplayName, AppTheme} from '../utils';
import styles from "../styles";

const Loading = () => {
	return (
		<>
			<View style={styles.loadingContainer}>
				<Image
					accessibilityRole={'image'}
					source={require('../assets/logo-transparent.png')}
					style={styles.loadingSplashImage}
				/>
				<Text style={styles.loadingText}>{AppDisplayName}</Text>
			</View>
		</>
	);
};
export default Loading;
