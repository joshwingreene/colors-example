export default function settingsData(state = { toggleValue: false }, action) {
	switch (action.type) {
		/*
		case 'FETCH_TOGGLE_VALUE':
			return state
		*/
		case 'TOGGLE_BTN':
			return Object.assign({}, state, { toggleValue: !state.toggleValue })
		default:
			return state
	}
}