import { NetInfo } from 'react-native';

export const saveAction = (actionFunction, argList) => {
    return {
        type: 'SAVE_ACTION',
        function: actionFunction,
        argList
    }
}

const dispatchSavedActions = () => {
    return {
        type: 'DISPATCH_SAVED_ACTIONS'
    }
}

const finishBatchDispatch = () => {
    return {
        type: 'FINISH_BATCH_DISPATCH'
    }
}

const checkingConnectionStatus = () => {
    return {
        type: 'CONNECTION_STATUS_CHECK'
    }
}

export const recordConnectionStatus = (connectionStatus) => {
    return {
        type: 'RECORD_CONNECTION_STATUS',
        status: connectionStatus
    }
}

// Thunk Action Creators

export const checkConnectionStatus = () => {
    
    return function(dispatch) {

        dispatch(checkingConnectionStatus());

        NetInfo.isConnected.fetch().then(isConnected => {
            dispatch(recordConnectionStatus(isConnected));
        });

        /*
        NetInfo.getConnectionInfo().then((connectionInfo) => {
            console.log(
              'Initial, type: ' +
                connectionInfo.type +
                ', effectiveType: ' +
                connectionInfo.effectiveType,
            );
          });
        */

        /*
        return buildRequest({ mainEndpoint: 'UserColors', method: 'POST', body: { fields: { hexColor } }})
            .then(json => {
                    dispatch(recordSavedColor(json));
                }
            )
        */
    }
}

export const executeSavedActions = (savedActions) => {  // Issue: Some networking questions will likely complete before earlier ones (thinking about using promises and then statements to make sure the completion order is consistent)

    return function(dispatch) {

        dispatch(dispatchSavedActions());

        for (let i = 0; i < savedActions.length; i++) {
            dispatch(savedActions[i].function(...savedActions[i].argList));
        }

        dispatch(finishBatchDispatch());
    }
}