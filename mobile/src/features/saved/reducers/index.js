export default function savedData(state = { savedColors: [] }, action) {
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