import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import HomeStack from './HomeStack';
import SavedStack from './SavedStack';
import SettingsStack from './SettingsStack';

//import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const TabNavigator = createBottomTabNavigator(
	{
		Home: HomeStack,
		Saved: SavedStack,
		Settings: SettingsStack
	},
	{
		// TODO: Follow the steps in order to import the MaterialIcons bundled by react-native-vector-icons - https://github.com/oblador/react-native-vector-icons
		defaultNavigationOptions: ({ navigation }) => ({
            /*
			tabBarIcon: ({ tintColor }) => {
			  const { routeName } = navigation.state;
			  let iconName;
			  if (routeName === 'Home') {
				iconName = 'home';
			  } else if (routeName === 'Search') {
				iconName = 'search';
			  }
	  
			  // You can return any component that you like here! We usually use an
			  // icon component from react-native-vector-icons
			  return <MaterialIcons name={iconName} size={25} color={ tintColor } />;
            },
            */
		}),
		tabBarOptions: {
			activeTintColor: '#4A4A4A',
			inactiveTintColor: '#828485',
		},
	}
);

export default TabNavigator;