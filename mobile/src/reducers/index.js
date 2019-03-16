//import { combineReducers } from "redux";
//import homeSection from "../features/home/reducers"
//import savedSection from "../features/saved/reducers"

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

function settingsData(state = false, action) {
	switch (action.type) {
		case 'TOGGLE_BTN':
			return Object.assign({}, state, { settingsToggleValue: !state.settingsToggleValue })
		default:
			return state
	}
}

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

/*
export default combineReducers({
	homeSection, 
	savedSection
});
*/