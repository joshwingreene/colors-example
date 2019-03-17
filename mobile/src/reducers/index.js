//import { combineReducers } from "redux";
//import homeSection from "../features/home/reducers"
//import savedSection from "../features/saved/reducers"

/*
const initialState = {
	colors: [
		{ hexColor: '#4286f4', isSaved: false },
		{ hexColor: '#41f465', isSaved: false },
		{ hexColor: '#f1f441', isSaved: false },
		{ hexColor: '#f4bb41', isSaved: false },
		{ hexColor: '#f44641', isSaved: false },
		{ hexColor: '#4161f4', isSaved: false },
		{ hexColor: '#7c41f4', isSaved: false },
		{ hexColor: '#f441a6', isSaved: false }
	],
	selectedColorIndex: null,
	//settingsToggleValue: false
}
*/

/* Planned State Tree

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

const initialColors = [
	{ hexColor: '#4286f4', isSaved: false },
		{ hexColor: '#41f465', isSaved: false },
		{ hexColor: '#f1f441', isSaved: false },
		{ hexColor: '#f4bb41', isSaved: false },
		{ hexColor: '#f44641', isSaved: false },
		{ hexColor: '#4161f4', isSaved: false },
		{ hexColor: '#7c41f4', isSaved: false },
		{ hexColor: '#f441a6', isSaved: false }
];

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

function fetchedColors(state = initialColors, action) {
	switch(action.type) {
		case 'TOGGLE_COLOR':
				return state.colors.map((color, index) => {
						if (index === action.index) {
							return Object.assign({}, color, {
								isSaved: !color.isSaved
							})
						}
						return color
				})
		default:
				state
	}
}

function selectedColor(state = null, action) {
	switch(action.type) {
		case 'SELECT_COLOR':
			return action.index
		case 'RESET_COLOR_SELECTION':
			return null
		default:
			state
	}
}

function homeData(state = { colors: initialColors, selectedColorIndex: null }, action) {
	switch (action.type) {
		case 'TOGGLE_COLOR':
			return Object.assign({}, state, { colors: fetchedColors(state.colors, action) })
		case 'SELECT_COLOR':
			return Object.assign({}, state, { selectedColorIndex: selectedColor(state.selectedColorIndex, action) })
		case 'RESET_COLOR_SELECTION':
			return Object.assign({}, state, { selectedColorIndex: selectedColor(state.selectedColorIndex, action) })
		default:
			return state
	}
}

function savedData(state = [], action) {

}

function colorsData(state = { colors: initialColors, selectedColorIndex: null }, action) {
	console.log('colorsData - state - ', state);
	switch (action.type) {
		/*
		case 'FETCH_COLORS':
				return state
		*/
		case 'TOGGLE_COLOR':
				return Object.assign({}, state, {
					colors: state.colors.map((color, index) => {
						if (index === action.index) {
							return Object.assign({}, color, {
								isSaved: !color.isSaved
							})
						}
						return color
					})
				})
		case 'SELECT_COLOR':
			return Object.assign({}, state, { selectedColorIndex: action.index })
		case 'RESET_COLOR_SELECTION':
			return Object.assign({}, state, { selectedColorIndex: null })
		case 'REMOVE_SAVED_COLOR':
			return Object.assign({}, state, {
				colors: state.colors.map((color) => {
					if (color.hexColor == action.hexColor) {
						return Object.assign({}, color, {
							isSaved: false
						})
					}
					return color
				})
			})
		default: 
			return state
	}
}

export default function colorsApp(state = {}, action) {
	return {
		colorsData: colorsData(state.colorsData, action),
		settingsData: settingsData(state.settingsData, action)
	}
}

/*
export default function colorsApp(state = { colorsData: { colors: initialColors, selectedColorIndex: null }, settingsData: { toggleValue: false } }, action) { 
	// Important: those fetch actions were necessary because I didn't provide the initial state here (tested), which means that initializing the state in colorsData and settingsData should also be removed (tested)
	// However, the point is that I want to split up the initialization and management of the state. So, the above root reducer is what I need to use to initialize the state for each slice )
	
	console.log('colorsApp');
	switch (action.type) {
			case 'FETCH_COLORS':
				return Object.assign({}, state, { colorsData: colorsData(state.colorsData, action) })
			case 'TOGGLE_COLOR':
				return Object.assign({}, state, { colorsData: colorsData(state.colorsData, action) })
			case 'SELECT_COLOR':
				return Object.assign({}, state, { colorsData: colorsData(state.colorsData, action) })
			case 'RESET_COLOR_SELECTION':
				return Object.assign({}, state, { colorsData: colorsData(state.colorsData, action) })
			case 'REMOVE_SAVED_COLOR':
				return Object.assign({}, state, { colorsData: colorsData(state.colorsData, action) })
			case 'FETCH_TOGGLE_VALUE':
				return Object.assign({}, state, { settingsData: settingsData(state.settingsData, action) })
			case 'TOGGLE_BTN':
				return Object.assign({}, state, { settingsData: settingsData(state.settingsData, action) })
			default:
				return state
	}
}
*/

/*
export default function colorsApp(state = initialState, action) {
	switch (action.type) {
			case 'TOGGLE_COLOR':
					return Object.assign({}, state, {
						colors: state.colors.map((color, index) => {
							if (index === action.index) {
								return Object.assign({}, color, {
									isSaved: !color.isSaved
								})
							}
							return color
						})
					})
			case 'SELECT_COLOR':
				return Object.assign({}, state, { selectedColorIndex: action.index })
			case 'REMOVE_SAVED_COLOR':
					return Object.assign({}, state, {
						colors: state.colors.map((color) => {
							if (color.hexColor == action.hexColor) {
								return Object.assign({}, color, {
									isSaved: false
								})
							}
							return color
						})
					})
			case 'TOGGLE_BTN':
					//return Object.assign({}, state, { settingsToggleValue: !state.settingsToggleValue })
					return Object.assign({}, state, { settingsToggleValue: settingsData(state.settingsToggleValue, action) })
			default:
					return state
	}
}
*/

/*
export default combineReducers({
	homeSection, 
	savedSection
});
*/