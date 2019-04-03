
export default function savedActionsData(state = { savedActions: [], isDispatchingSavedActions: false }, action) {
	switch(action.type) {
        case 'SAVE_ACTION':
            return Object.assign({}, state, { savedActions: [ ...state.savedActions, { function: action.function, argList: action.argList } ] })
        case 'DISPATCH_SAVED_ACTIONS':
            return Object.assign({}, state, { isDispatchingSavedActions: true })
        case 'FINISH_BATCH_DISPATCH':
            return Object.assign({}, state, { savedActions: [], isDispatchingSavedActions: false })
        default:
			return state
	}
}