//import { combineReducers } from "redux";
//import navigationData from "../navigation/reducers"
//import navSection from "../navigation/reducers"

/* // Attempting to use this after changing the properties to match the imports wasn't working (combineReducers could possibly only work one level deep)
export default combineReducers({
	goals, 
  	navigationData
});
*/

/*
export default function RootReducer(state = {}, action) { // using until more parts of the state are operational
	
	//let navState = Object.keys(state).length === 0 ? {} : state.navigationData;
	// can't do {} == {} (reason for the above condition)

	//console.log('updated goal state:', goalState);
	
	return {
	  navigationData: navigationData(state, action)
	}
}
*/