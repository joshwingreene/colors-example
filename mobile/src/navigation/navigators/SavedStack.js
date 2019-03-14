import { createStackNavigator } from 'react-navigation';
import Saved from '../../Saved';

const SavedStack = createStackNavigator( // Planned Screens: Saved, Detail (reuse the one from the HomeStack)
	{
		Saved: {
			screen: Saved,
		}
	},
	{
		initialRouteName: 'Saved'
	}
);

export default SavedStack;