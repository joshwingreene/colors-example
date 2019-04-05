export default function savedData(state = { 
									//savedColors: [], 
									isFetchingUserColors: false, 
									isPostingColor: false, 
									isDeletingColor: false, 
									isPersistingUserColors: false,
									isPersistingUserColor: false,
									isDeletingPersistedColor: false,
									numOfSavedColors: 0
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
		case 'FINISHED_POSTING_SAVED_COLOR':
			return Object.assign({}, state, { isPostingColor: false })
		// ------
		// db related
		case 'SAVING_USER_COLORS_TO_REALM': // TODO: Change to DB (remember: we want to share this code between web and mobile)
			return Object.assign({}, state, { isPersistingUserColors: true })
		case 'FINISHED_PERSISTING_USER_COLORS':
			return Object.assign({}, state, { isPersistingUserColors: false })
		case 'SAVING_USER_COLOR_TO_DB':
			return Object.assign({}, state, { isPersistingUserColor: true })
		case 'FINISHED_SAVING_USER_COLOR_TO_DB':
			return Object.assign({}, state, { isPersistingUserColor: false })
		case 'DB_DELETING_SAVED_COLOR':
			return Object.assign({}, state, { isDeletingPersistedColor: true })
		case 'DB_FINISHED_DELETING_SAVED_COLOR':
			return Object.assign({}, state, { isDeletingPersistedColor: false })
		case 'SAVE_NUMBER_OF_SAVED_COLORS':
			return Object.assign({}, state, { numOfSavedColors: action.numOfSavedColors })
		case 'INCREMENT_NUM_OF_SAVED_COLORS':
			return Object.assign({}, state, { numOfSavedColors: ++state.numOfSavedColors })
		case 'DECREMENT_NUM_OF_SAVED_COLORS':
			return Object.assign({}, state, { numOfSavedColors: --state.numOfSavedColors })
		// ------
		case 'REQUEST_USER_COLORS':
			return Object.assign({}, state, { isFetchingUserColors: true })
		case 'RECEIVE_USER_COLORS':
			return Object.assign({}, state, { savedColors: action.colors, isFetchingUserColors: false })
		case 'DELETING_SAVED_COLOR_FROM_API':
			return Object.assign({}, state, { isDeletingColor: true })
		case 'FINISHED_DELETING_SAVED_COLOR_FROM_API':
			return Object.assign({}, state, { isDeletingColor: false })
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