import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../../features/home/containers/homeScreen';
import DetailScreen from '../../features/home/containers/detailScreen';
import * as screenNames from '../screen_names';

const HomeStack = createStackNavigator(
	{
		[ screenNames.HOME ]: {
			screen: HomeScreen,
		},
		[ screenNames.DETAIL ]: {
			screen: DetailScreen,
		}
	},
	{
		initialRouteName: 'Home'
	}
);

export default HomeStack;