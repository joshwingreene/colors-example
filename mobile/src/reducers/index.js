import homeData from '../features/home/reducers';
import savedData from '../features/saved/reducers';
import settingsData from '../features/settings/reducers';

/* State Tree

{
	homeData: {
		fetchedColors: [ { hexColor: #4286f4 }, ... ],
		selectedColorIndex: null,
	},
	savedData: {
		savedColors: [ { hexColor: #4286f4 }, ... ]
	},
	settingsData: {
		toggleValue: false
	}
}

*/

export default function colorsApp(state = {}, action) {
	return {
		homeData: homeData(state.homeData, action),
		savedData: savedData(state.savedData, action),
		settingsData: settingsData(state.settingsData, action)
	}
}