import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack';
import deviceInfo, {init as deviceInfoInit} from './deviceInfo';

// async inits
import {getRemoteSettingAsNumber, init as remoteSettingsInit} from './remoteSettings';

// screens
import Loading from './screens/Loading';
import App from './screens/App';
import {Theme} from '@react-navigation/native/lib/typescript/src/types';

export type StackNavigationProps = {
	route: any;
	navigation: StackNavigationProp<any>;
};

export const AppTheme: Theme = {
	dark: true,
	colors: {
		primary: 'rgb(234, 35, 105)',
		background: 'rgb(75, 76, 80)',
		card: 'rgb(75, 76, 80)',
		text: 'rgb(255, 255, 255)',
		border: 'rgb(199, 199, 204)',
	},
};

let shouldInitialize = true;

// https://stackoverflow.com/questions/55846641/react-hook-usestate-is-called-in-function-app-which-is-neither-a-react-funct
export default function Screens() {
	const [isReady, setReady] = useState(false);

	if (shouldInitialize) {
		shouldInitialize = false;
		(async () => {
			// async initialization
			await remoteSettingsInit();
			await deviceInfoInit();

			console.log(getRemoteSettingAsNumber('test123'));

			await new Promise((resolve) => setTimeout(resolve, 1000));
			setReady(true);
		})();
	}

	if (!isReady) {
		return Loading();
	}

	const Stack = createStackNavigator();
	return (
		<NavigationContainer theme={AppTheme}>
			<Stack.Navigator headerMode="screen">
				<Stack.Screen name="App" component={App} options={{title: deviceInfo.applicationName}} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
