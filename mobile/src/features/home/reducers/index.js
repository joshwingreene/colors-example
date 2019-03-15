//import { combineReducers } from 'redux'
import colors from './colors'

/*
export default combineReducers({
	colors,
	savedColors
})
*/

export default function homeSection(state, action) { // using until more parts of the goal section state become operational
	
	return {
	  colors: colors(state.colors, action) // state.colors is currently giving me an error (Let's finish that Redux tutorial first and then come back to this)
	}
}