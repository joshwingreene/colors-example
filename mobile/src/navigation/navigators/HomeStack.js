import { createStackNavigator } from 'react-navigation';
import Home from '../../Home';
import * as screenNames from '../screen_names';

const HomeStack = createStackNavigator( // Planned Screens: Home, Detail
	{
		[ screenNames.HOME ]: {
			screen: Home,
		}
	},
	{
		initialRouteName: 'Home'
	}
);

export default HomeStack;