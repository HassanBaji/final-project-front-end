/**
 * @format
 */

import {Amplify, Auth, API} from 'aws-amplify';
import amplifyconfig from './src/amplifyconfiguration.json';
import apiConigure from './src/apiConfigure.json';
import {api} from './api-exports';
import awsmobile from './src/aws-exports';

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {auth} from './src/auth-config';

Amplify.configure(awsmobile);

AppRegistry.registerComponent(appName, () => App);
