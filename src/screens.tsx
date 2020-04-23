import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack';

// async inits
import {getRemoteSettingAsNumber, init as remoteSettingsInit} from './remoteSettings';
import deviceInfo, {init as deviceInfoInit} from './deviceInfo';

// screens
import Loading from './screens/Loading';
import App from './screens/App';

export type StackNavigationProps = {
	route: any;
	navigation: StackNavigationProp<any>;
};

let shouldInitialize = true;

async function startInits() {
	// async initialization
	await remoteSettingsInit();
	await deviceInfoInit();

	console.log(getRemoteSettingAsNumber('test123'))
}

// https://stackoverflow.com/questions/55846641/react-hook-usestate-is-called-in-function-app-which-is-neither-a-react-funct
export default function Screens() {
	const [isReady, setReady] = useState(false);

	if (shouldInitialize) {
		shouldInitialize = false;
		(async () => {
			await startInits();

			await new Promise((resolve) => setTimeout(resolve, 1000));
			setReady(true);
		})();
	}

	if (!isReady) {
		return Loading();
	}

	const Stack = createStackNavigator();
	return (
		<NavigationContainer>
			<Stack.Navigator
				headerMode="screen"
				screenOptions={{
					headerStyle: {backgroundColor: 'white'},
					cardStyle: {backgroundColor: 'white'},
				}}>
				<Stack.Screen name="App" component={App} options={{title: deviceInfo.applicationName}} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
