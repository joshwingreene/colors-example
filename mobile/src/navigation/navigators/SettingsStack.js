import { createStackNavigator } from 'react-navigation';
import SettingsScreen from '../../features/settings/containers/settingsScreen';
import * as screenNames from '../screen_names';

const SettingsStack = createStackNavigator(
	{
		[ screenNames.SETTINGS ]: {
			screen: SettingsScreen,
		}
	},
	{
		initialRouteName: 'Settings'
	}
);

export default SettingsStack;