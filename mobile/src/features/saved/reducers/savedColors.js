const savedColors = (state = [], action) => {
	switch (action.type) {
        case 'SAVE_COLOR':
            return [
                ...state,
                {
                    id: action.id,
                    hexColor: action.hexColor
                }
            ]
        default:
            return state
        }
  }

  export default savedColors