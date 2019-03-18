export default function fetchedColorData(state = { fetchedColors: [], isFetchingColors: false }, action) {
	switch(action.type) {
        case 'REQUEST_COLORS':
            return Object.assign({}, state, { isFetchingColors: true })
        case 'RECEIVE_COLORS':
            return Object.assign({}, state, { fetchedColors: action.colors, isFetchingColors: false })
		default:
			return state
	}
}