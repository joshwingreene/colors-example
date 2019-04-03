import homeData from '../features/home/reducers';
import savedData from '../features/saved/reducers';
import settingsData from '../features/settings/reducers';
import connectionData from '../utility/reducers/connectionData';
import savedActionsData from '../utility/reducers/savedActionsData';

/* State Tree

{
	// Tab/Feature-Specific
	homeData: {
		fetchedColors: [ { hexColor: #4286f4 }, ... ],
		selectedColorIndex: null,
	},
	savedData: {
		savedColors: [ { hexColor: #4286f4 }, ... ]
	},
	settingsData: {
		toggleValue: false
	},
	// Utility
	connectionData: { // using to be able to know when the device is online and using this infomation for offline-use purposes
		isDeviceOnline: false,
		isCheckingConnectionStatus: false
	},
	savedActionsData: { // save actions that correspond to network requests while the user is offline (so they can all
						// be dispatched when the user gets back online)
		savedActions: [],
		isDispatchingSavedActions: false
	}
}

*/

export default function colorsApp(state = {}, action) {
	return {
		homeData: homeData(state.homeData, action),
		savedData: savedData(state.savedData, action),
		settingsData: settingsData(state.settingsData, action),
		connectionData: connectionData(state.connectionData, action),
		savedActionsData: savedActionsData(state.savedActionsData, action)
	}
}