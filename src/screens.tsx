import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack';
import {AppDisplayName} from './utils';
import {AppTheme} from './styles';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// async inits
import {init as remoteSettingsInit} from './remoteSettings';
import deviceInfo, {init as deviceInfoInit} from './deviceInfo';
import Model from './model/Model';

// screens
import Loading from './screens/Loading';
import Home from './screens/Home';
import Actions from './screens/Actions';
import MetaInformation from './screens/MetaInformation';
import StartRecording from './screens/StartRecording';
import Recording from './screens/Recording';
import ActionsSelector from './screens/ActionsSelector';
import {acquireMotionPermissions, acquireRecordPermissions} from './permissions';

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

			await acquireRecordPermissions();
			await acquireMotionPermissions();

			await Model.init();

			await auth().signInAnonymously(); // sign in anonymously so that the db can be used

			await firestore()
				.collection('Devices')
				.doc(deviceInfo.uniqueID)
				.set(Object.assign({}, deviceInfo) as {[key: string]: any});

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
				<Stack.Screen name="ActionsSelector" component={ActionsSelector} options={{title: 'Select one'}} />
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
