import { createStackNavigator } from 'react-navigation';
import SavedScreen from '../../features/saved/containers/savedScreen';
import * as screenNames from '../screen_names';

const SavedStack = createStackNavigator(
	{
		[ screenNames.SAVED ]: {
			screen: SavedScreen,
		}
	},
	{
		initialRouteName: 'Saved'
	}
);

export default SavedStack;