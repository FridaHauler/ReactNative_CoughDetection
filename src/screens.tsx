import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack';
import {AppDisplayName, AppTheme} from './utils';

// async inits
import {init as remoteSettingsInit} from './remoteSettings';
import {init as deviceInfoInit} from './deviceInfo';

// screens
import Loading from './screens/Loading';
import Home from './screens/Home';
import Actions from './screens/Actions';
import MetaInformation from './screens/MetaInformation';
import StartRecording from './screens/StartRecording';
import Recording from './screens/Recording';

export type StackNavigationProps = {
	route: any;
	navigation: StackNavigationProp<any>;
};

let shouldInitialize = true;

export default function Screens() {
	const [isReady, setReady] = useState(false);

	if (shouldInitialize) {
		shouldInitialize = false;
		(async () => {
			// async initialization
			await remoteSettingsInit();
			await deviceInfoInit();

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
				<Stack.Screen name="Home" component={Home} options={{title: AppDisplayName}} />
				<Stack.Screen name="Actions" component={Actions} options={{title: 'Actions'}} />
				<Stack.Screen name="MetaInformation" component={MetaInformation} options={{title: 'Information'}} />
				<Stack.Screen name="StartRecording" component={StartRecording} options={{title: 'Start Recording'}} />
				<Stack.Screen
					name="Recording"
					component={Recording}
					options={{title: '', headerShown: false, gestureEnabled: false}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
