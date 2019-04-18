import { buildRequest } from '../../../api/helper';
import { saveAction } from '../../../utility/actions';
import realm from '../../../db/helper';
import { persistUserColor, persistUserColors, deleteUserColors } from '../../../db/UserColors';
import { postUserColor } from '../../../api/UserColors';

export const requestColors = () => ({
    type: 'REQUEST_COLORS'
})

export const requestUserColors = () => ({
    type: 'REQUEST_USER_COLORS'
})

export const postSavedColor = () => ({
    type: 'POST_SAVED_COLOR'
})

export const finishedPostingSavedColor = () => ({
    type: 'FINISHED_POSTING_SAVED_COLOR'
})

export const selectColor = index => ({
    type: 'SELECT_COLOR',
    index
})

export const resetColorSelection = () => ({
    type: 'RESET_COLOR_SELECTION'
})

const createColorList = (json) => {
    let colors = json.records;

    let result = [];

    for (let i = 0; i < colors.length; i++) {
        result.push({ id: colors[i].id, hexColor: colors[i].fields.hexColor });
    }

    return result;
}

export const receiveColors = (json) => { 
  
    return {
        type: 'RECEIVE_COLORS',
        colors: createColorList(json)
    }
}

export const receiveUserColors = () => {
    return {
        type: 'RECEIVE_USER_COLORS'
    }
}

export const dbPersistingUserColors = () => {
    return {
        type: 'SAVING_USER_COLORS_TO_DB'
    }
}

export const dbSavingUserColor = () => {
    return {
        type: 'SAVING_USER_COLOR_TO_DB'
    }
}

export const dbFinishedSavingUserColor = () => {
    return {
        type: 'FINISHED_SAVING_USER_COLOR_TO_DB'
    }
}

export const finishedPersistingUserColors = () => {
    return {
        type: 'FINISHED_PERSISTING_USER_COLORS'
    }
}

export const saveNumberOfSavedColors = (number) => {
    return {
        type: 'SAVE_NUMBER_OF_SAVED_COLORS',
        numOfSavedColors: number
    }
}

export const incrementSavedColorNum = () => {
    return {
        type: 'INCREMENT_NUM_OF_SAVED_COLORS'
    }
}

// Thunk Action Creators

export const fetchColors = () => {

    return function(dispatch) {
  
        dispatch(requestColors());
  
        return buildRequest({ mainEndpoint: 'HomeColors', method: 'GET' })
            .then(json => {
                    dispatch(receiveColors(json)) // we can dispatch many times here based on the documentation 
                })/*
            .catch(error => {
                console.log('Catched Response: ', error);

                if (error.message == 'Network request failed') {
                    console.log('network request failed');
                }
            })
            */
    }
}

export const fetchUserColors = () => {

    return function(dispatch) {
        
        dispatch(requestUserColors());

        return buildRequest({ mainEndpoint: 'UserColors', method: 'GET' })
            .then(json => {
                let colorList = createColorList(json);
                dispatch(receiveUserColors()); // now just used to say that the colors have been received and we have finished fetching them
                dispatch(dbSaveUserColors(colorList));
                //deleteUserColors({}, realm); // using to wipe the saved colors when needed
            })
    }
}

export const dbSaveUserColors = (colorList) => {

    return function(dispatch) {

        dispatch(dbPersistingUserColors());

        return persistUserColors({ colorList }, realm)
            .then(() => {
                dispatch(finishedPersistingUserColors());
                dispatch(saveNumberOfSavedColors(colorList.length));
            })
            .catch((error) => {
                console.log('DB Error: ', error);
            })
    }
}

export const saveColorToBackendAndState = (hexColor) => {
    
    return function(dispatch) {

        dispatch(postSavedColor());

        return buildRequest({ mainEndpoint: 'UserColors', method: 'POST', body: { fields: { hexColor } }})
            .then(json => {
                    dispatch(recordSavedColor(json));
                }
            )
    }
}

export const netPostUserColor = (hexColor) => {

    return function(dispatch) {

        dispatch(postSavedColor());

        return postUserColor(hexColor)
            .then(json => {
                dispatch(finishedPostingSavedColor());
            })
    }
}

export const dbPersistUserColor = (id, hexColor) => {

    return function(dispatch) {

        dispatch(dbSavingUserColor());

        return persistUserColor( { id, hexColor }, realm)
            .then(() => {
                dispatch(dbFinishedSavingUserColor());
                dispatch(incrementSavedColorNum());
            })
    }
}

/*
export const saveColorToDBAndBackend = (hexColor) => { // The id will be from the associated 

    return function(dispatch) {

        dispatch(dbSavingUserColor());

        return persistUserColor( { hexColor }, realm)
            .then(() => {
                dispatch(dbFinishedSavingUserColor());
                dispatch(netPostUserColor(hexColor));
            })
    }
}
*/

export const onlineSaveColorToAPIAndDB = (hexColor) => {

    return function(dispatch) {

        dispatch(postSavedColor());

        return postUserColor(hexColor)
            .then(json => {
                dispatch(finishedPostingSavedColor());
                dispatch(dbPersistUserColor(json.id, json.fields.hexColor));
        })
    }

}

export const saveColor = (hexColor, isDeviceOnline) => { // TODO: Add a paramater for the database thunk action creator that will be used and passed in by the screen
    console.log('saveColor - isDeviceOnline -', isDeviceOnline);
    return function(dispatch) {

        /*

        possible approach // TODO: Do some research to see what other people are doing

        if online access
        - record the color after the request, like before

        if offline (thinking of it going offline after the colors are fetched and added to the state)
        - save the color using the hex color
        - save the action for saving to online (I can also save the name to the database, which is something that can be added to saveAction)
        - when online again, fire off this action (reducer should make sure there are no duplicate colors saved) and all other saved actions that relate to the backend 

        */

        // if online
        if (isDeviceOnline) {
            //dispatch(saveColorToBackendAndState(hexColor));
            dispatch(onlineSaveColorToAPIAndDB(hexColor));
        } else {
            // if offline
            //dispatch(offlineSaveColorToState(hexColor)); // (as for how this and the following line were being used previously, refer to the git history) commenting out since I will have deleted the previous action / reducer case, but may need a similar method when redux-offline is being used
            //dispatch(saveAction(saveColorToBackendAndUpdateState, [ hexColor ])); // TODO: Create a new method that updates the state with the id from the backend (ex. saveColorToBackendAndUpdateLocalRecord)
        }
    }
}

/*
export const userChoosesColor = (index) => { // Not recommended to navigate in this way by the responder to this Stack Overflow question - https://stackoverflow.com/questions/53697627/navigation-after-async-operation-using-react-and-redux-thunk

    return function(dispatch) {
  
      dispatch(selectColor(index));
  
      return NavigationService.navigate('Detail', {});
    }
}

// note - was used by ColorGridContainer and would have replcaced the selectColor attribute in mapDispatchToProps
*/