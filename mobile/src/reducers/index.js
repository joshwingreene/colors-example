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
	selectedColorIndex: null
  }

export default function colorsApp(state = initialState, action) {
	switch (action.type) {
        case 'TOGGLE_COLOR': // this should be done in the nav bar
            return Object.assign({}, state, {
				colors: state.colors.map((color, index) => {
					if (index === action.index) {
						return Object.assign({}, color, {
							isSaved: !color.isSaved
						})
					}
					return color
				} )
			})
		case 'SELECT_COLOR':
			return Object.assign({}, state, { selectedColorIndex: action.index })
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