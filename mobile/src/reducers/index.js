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

const staticFetchedColors = [
	{ hexColor: '#4286f4' },
	{ hexColor: '#41f465' },
	{ hexColor: '#f1f441' },
	{ hexColor: '#f4bb41' },
	{ hexColor: '#f44641' },
	{ hexColor: '#4161f4' },
	{ hexColor: '#7c41f4' },
	{ hexColor: '#f441a6' }
];

function fetchedColors(fetchedColors = staticFetchedColors, action) {
	switch(action.type) {
		/*
		case 'FETCH_COLORS':
				return state
		*/
		default:
			return fetchedColors
	}
}

function selectedColorIndex(value = null, action) {
	switch(action.type) {
		case 'SELECT_COLOR':
			return action.index
		case 'RESET_COLOR_SELECTION':
			return null
		default:
			return value
	}
}

function homeData(state = {}, action) {
	console.log('homeData - state - ', state);
	return {
		fetchedColors: fetchedColors(state.fetchedColors, action),
		selectedColorIndex: selectedColorIndex(state.selectedColorIndex, action)
	}
}

function savedData(state = { savedColors: [] }, action) {
	switch (action.type) {
		case 'SAVE_COLOR':
				return Object.assign({}, state, { savedColors: [ ...state.savedColors, { hexColor: action.hexColor } ] })
		case 'REMOVE_SAVED_COLOR':
				// get the index of the color that will be removed
				let indexOfColor = null;

				for (let i = 0; i < state.savedColors.length; i++) {
					if (state.savedColors[i].hexColor == action.hexColor) {
						indexOfColor = i;
					}
				}

				// create a new array with only the surrounding colors
				let copiedArray = state.savedColors.slice();

				copiedArray.splice(indexOfColor, 1);

				return Object.assign({}, state, { savedColors: copiedArray })
		default:
			return state
	}
}

function settingsData(state = { toggleValue: false }, action) {
	switch (action.type) {
		/*
		case 'FETCH_TOGGLE_VALUE':
			return state
		*/
		case 'TOGGLE_BTN':
			return Object.assign({}, state, { toggleValue: !state.toggleValue })
		default:
			return state
	}
}

export default function colorsApp(state = {}, action) {
	console.log('colorsApp - action - ', action);
	return {
		homeData: homeData(state.homeData, action),
		savedData: savedData(state.savedData, action),
		settingsData: settingsData(state.settingsData, action)
	}
}