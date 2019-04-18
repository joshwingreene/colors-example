import { buildRequest } from '../../../api/helper';
import { apiDeleteUserColor } from '../../../api/UserColors';
import { dbDeleteUserColor } from '../../../db/UserColors';
import { realm } from '../../../db/helper';

export const apiDeletingColor = () => ({
    type: 'DELETING_SAVED_COLOR_FROM_API'
})

export const apiFinishedDeletingColor = () => ({
    type: 'FINISHED_DELETING_SAVED_COLOR_FROM_API'
});

export const dbDeletingColor = () => ({
    type: 'DB_DELETING_SAVED_COLOR'
})

export const dbFinishedDeletingColor = () => ({
    type: 'DB_FINISHED_DELETING_SAVED_COLOR'
})

export const decrementSavedColorNum = () => {
    return {
        type: 'DECREMENT_NUM_OF_SAVED_COLORS'
    }
}

// Thunk Action Creators

export const dbDeleteSavedColor = (hexColor) => { // TODO: Place in separate file (along with the realm import) and the associated notification methods

    return function(dispatch) {

        dispatch(dbDeletingColor());

        return dbDeleteUserColor( { hexColor }, realm)
            .then(() => {
                dispatch(dbFinishedDeletingColor());
                dispatch(decrementSavedColorNum());
            })
    }
}

export const onlineRemoveColorFromAPIAndDB = (id, hexColor) => {

    return function(dispatch) {

        dispatch(apiDeletingColor());

        return apiDeleteUserColor(id)
            .then((json) => {
                console.log('apiDeleteUserColors - json -', json);
                dispatch(apiFinishedDeletingColor());
                dispatch(dbDeleteSavedColor(hexColor));
            })
    }
}

export const removeColor = (id, hexColor, isDeviceOnline) => {

    return function(dispatch) {
  
        // if online
        if (isDeviceOnline) {
            dispatch(onlineRemoveColorFromAPIAndDB(id, hexColor));
        } else {
            // if offline
        }
    }
}