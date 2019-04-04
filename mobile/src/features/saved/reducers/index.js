export default function savedData(state = { 
									savedColors: [], 
									isFetchingUserColors: false, 
									isPostingColor: false, 
									isDeletingColor: false, 
									isPersistingUserColors: false 
								}, action) {
	switch (action.type) {
		case 'POST_SAVED_COLOR':
			return Object.assign({}, state, { isPostingColor: true })
		case 'RECORD_SAVED_COLOR':
			return Object.assign({}, state, { savedColors: [ ...state.savedColors, { id: action.id, hexColor: action.hexColor } ], isPostingColor: false })
		// testing
		case 'OFFLINE_SAVE_COLOR':
			return Object.assign({}, state, { savedColors: [ ...state.savedColors, { id: action.hexColor, hexColor: action.hexColor } ] })
		case 'UPDATE_SAVED_COLOR_ID':
			return Object.assign({}, state, {
				savedColors: state.savedColors.map((color) => {
					if (color.hexColor === action.hexColor) {
						return Object.assign({}, color, {
							id: action.id
						})
					}
					return color
				}),
				isPostingColor: false
			})
		// ------
		// realm related
		case 'SAVING_USER_COLORS_TO_REALM':
			return Object.assign({}, state, { isPersistingUserColors: true })
		case 'FINISHED_PERSISTING_USER_COLORS':
			return Object.assign({}, state, { isPersistingUserColors: false })
		// ------
		case 'REQUEST_USER_COLORS':
			return Object.assign({}, state, { isFetchingUserColors: true })
		case 'RECEIVE_USER_COLORS':
			return Object.assign({}, state, { savedColors: action.colors, isFetchingUserColors: false })
		case 'DELETE_SAVED_COLOR':
			return Object.assign({}, state, { isDeletingColor: true })
		case 'RECORD_SAVED_COLOR_REMOVAL':
				// get the index of the color that will be removed
				let indexOfColor = null;

				for (let i = 0; i < state.savedColors.length; i++) {
					if (state.savedColors[i].id == action.id) {
						indexOfColor = i;
					}
				}

				// create a new array with only the surrounding colors
				let copiedArray = state.savedColors.slice();

				copiedArray.splice(indexOfColor, 1);

				return Object.assign({}, state, { savedColors: copiedArray, isDeletingColor: false })
		default:
			return state
	}
}