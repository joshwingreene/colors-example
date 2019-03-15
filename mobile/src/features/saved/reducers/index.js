import savedColors from './savedColors';

export default function savedSection(state, action) { // using until more parts of the goal section state become operational
	
	return {
	  savedColors: savedColors(state.savedColors, action)
	}
}