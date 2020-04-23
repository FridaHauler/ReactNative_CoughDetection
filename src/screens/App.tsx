import React from 'react';
import {ScrollView, Text, StatusBar} from 'react-native';

const App = () => {
	return (
		<>
			<StatusBar barStyle="dark-content" />
			<ScrollView contentInsetAdjustmentBehavior="automatic">
				<Text>Learn More</Text>
			</ScrollView>
		</>
	);
};
export default App;
