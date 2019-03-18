import { buildRequest } from '../../../api/helper';

export const requestColors = () => ({
    type: 'REQUEST_COLORS'
})

export const saveColor = hexColor => ({
    type: 'SAVE_COLOR',
    hexColor
})

export const selectColor = index => ({
    type: 'SELECT_COLOR',
    index
})

export const resetColorSelection = () => ({
    type: 'RESET_COLOR_SELECTION'
})

export const receiveColors = (json) => {

    let fetchedColors = json.records;

    console.log('fetchedColors: ', fetchedColors);
  
    let result = [];
  
    for (let i = 0; i < fetchedColors.length; i++) {
      result.push({ hexColor: fetchedColors[i].fields.hexColor });
    }
  
    return {
      type: 'RECEIVE_COLORS',
      colors: result
    }
  } 

// Thunk Action Creators

export const fetchColors = () => {

    return function(dispatch) {
  
      dispatch(requestColors());
  
      return buildRequest({ mainEndpoint: 'HomeColors', method: 'GET' })
          .then(json => dispatch(receiveColors(json)))
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