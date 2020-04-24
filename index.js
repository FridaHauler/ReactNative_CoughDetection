import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import Screens from './src/screens';
import 'mobx-react-lite/batchingForReactNative';

AppRegistry.registerComponent(appName, () => Screens);
