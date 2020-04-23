import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {AppTheme} from '../screens';

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		backgroundColor: AppTheme.colors.background,
	},
	splashImage: {
		width: 200,
		height: 200,
	},
	appName: {
		marginTop: 40,
		fontSize: 24,
		fontWeight: '600',
		color: AppTheme.colors.text,
	},
});

const Loading = () => {
	return (
		<>
			<View style={styles.container}>
				<Image accessibilityRole={'image'} source={require('../assets/splash.png')} style={styles.splashImage} />
				<Text style={styles.appName}>{require('../../app.json').displayName}</Text>
			</View>
		</>
	);
};

export default Loading;
