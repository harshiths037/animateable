/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import AppSrc from './src/AppSrc';

AppRegistry.registerComponent(appName, () => AppSrc);
