import { buildRequest } from '../../../api/helper';

export const deleteColor = () => ({
    type: 'DELETE_SAVED_COLOR'
})

export const recordColorDeletion = json => ({
    type: 'RECORD_SAVED_COLOR_REMOVAL',
    id: json.id
})

// Thunk Action Creators

export const removeColor = (id) => {

    return function(dispatch) {
  
        dispatch(deleteColor()); // Implement
  
        return buildRequest({ mainEndpoint: 'UserColors', method: 'DELETE', params: { id: id } })
            .then(json => {
                    dispatch(recordColorDeletion(json)) // we can dispatch many times here based on the documentation 
                }
            )
    }
}