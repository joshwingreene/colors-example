export default function selectedColorIndex(value = null, action) {
	switch(action.type) {
		case 'SELECT_COLOR':
			return action.index
		case 'RESET_COLOR_SELECTION':
			return null
		default:
			return value
	}
}