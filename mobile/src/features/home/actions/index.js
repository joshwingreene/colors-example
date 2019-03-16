export const toggleColor = index => ({
    type: 'TOGGLE_COLOR',
    index
})

export const selectColor = index => ({
    type: 'SELECT_COLOR',
    index
})

// Thunk Action Creators

/*
export const userChoosesColor = (index) => { // Not recommended by the responder to this Stack Overflow question - https://stackoverflow.com/questions/53697627/navigation-after-async-operation-using-react-and-redux-thunk

    return function(dispatch) {
  
      dispatch(selectColor(index));
  
      return NavigationService.navigate('Detail', {});
    }
}

// note - was used by ColorGridContainer and would have replcaced the selectColor attribute in mapDispatchToProps
*/