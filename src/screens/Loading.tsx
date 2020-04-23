import React from 'react';
import {View, Text, Image} from 'react-native';

const Loading = () => {
	return (
		<>
			<View
				style={{
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100%',
				}}>
				<Image
					accessibilityRole={'image'}
					source={require('../assets/splash.png')}
					style={{
						width: 200,
						height: 200,
					}}
				/>
				<Text
					style={{
						marginTop: 40,
						fontSize: 24,
						fontWeight: '600',
					}}>
					{require('../../app.json').displayName}
				</Text>
			</View>
		</>
	);
};

export default Loading;
