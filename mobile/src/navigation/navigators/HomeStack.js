import { createStackNavigator } from 'react-navigation';
import Home from '../../Home';

const HomeStack = createStackNavigator( // Planned Screens: Home, Detail
	{
		Home: {
			screen: Home,
		}
	},
	{
		initialRouteName: 'Home'
	}
);

export default HomeStack;