export default function connectionData(state = { isDeviceOnline: false, isCheckingConnectionStatus: false }, action) {
	switch(action.type) {
        case 'CONNECTION_STATUS_CHECK':
            return Object.assign({}, state, { isCheckingConnectionStatus: true })
        case 'RECORD_CONNECTION_STATUS':
            return Object.assign({}, state, { isDeviceOnline: action.status, isCheckingConnectionStatus: false })
		default:
			return state
	}
}