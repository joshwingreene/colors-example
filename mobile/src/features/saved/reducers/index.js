export default function savedData(state = { 
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
		// testing
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
			return Object.assign({}, state, { isFetchingUserColors: false })
		case 'DELETING_SAVED_COLOR_FROM_API':
			return Object.assign({}, state, { isDeletingColor: true })
		case 'FINISHED_DELETING_SAVED_COLOR_FROM_API':
			return Object.assign({}, state, { isDeletingColor: false })
		default:
			return state
	}
}