/**
 * @format
 */

import {AppRegistry} from 'react-native';
import StartPage from './StartPage';
import {name as appName} from './app.json';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Module RCTImageLoader requires',
  'Async'
]);
AppRegistry.registerComponent(appName, () => StartPage);
