import { createStackNavigator } from 'react-navigation';
import Saved from '../../Saved';
import * as screenNames from '../screen_names';

const SavedStack = createStackNavigator( // Planned Screens: Saved, Detail (reuse the one from the HomeStack)
	{
		[ screenNames.SAVED ]: {
			screen: Saved,
		}
	},
	{
		initialRouteName: 'Saved'
	}
);

export default SavedStack;