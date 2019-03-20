import { buildRequest } from '../../../api/helper';

export const requestColors = () => ({
    type: 'REQUEST_COLORS'
})

export const requestUserColors = () => ({
    type: 'REQUEST_USER_COLORS'
})

export const postSavedColor = () => ({
    type: 'POST_SAVED_COLOR'
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

export const receiveUserColors = (json) => {
  
    return {
        type: 'RECEIVE_USER_COLORS',
        colors: createColorList(json)
    }

}

export const recordSavedColor = (json) => {

    return {
        type: 'RECORD_SAVED_COLOR',
        id: json.id,
        hexColor: json.fields.hexColor
    }
}

// Thunk Action Creators

export const fetchColors = () => {

    return function(dispatch) {
  
        dispatch(requestColors());
  
        return buildRequest({ mainEndpoint: 'HomeColors', method: 'GET' })
            .then(json => {
                    dispatch(receiveColors(json)) // we can dispatch many times here based on the documentation 
                }
            )
    }
}

export const fetchUserColors = () => {

    return function(dispatch) {
        
        dispatch(requestUserColors());

        return buildRequest({ mainEndpoint: 'UserColors', method: 'GET' })
            .then(json => {
                dispatch(receiveUserColors(json));

                // TODO: I think I could dispatch a thunk action creator that saves the saved colors to the DB. I can do the same thing
                //   in saveColor
            })
    }
}
  
export const saveColor = (hexColor) => {

    return function(dispatch) {

        dispatch(postSavedColor()); // stating that an API call is starting

        // note: I can dispatch multiple actions here (thinking of dispatching the action that updates the state here (or in the above dispatch) and then doing a dispatch for the thunk action creator for the database call after the api call

        return buildRequest({ mainEndpoint: 'UserColors', method: 'POST', body: { fields: { hexColor } }})
            .then(json => {
                    dispatch(recordSavedColor(json));
                }
            )
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