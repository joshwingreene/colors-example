const tempColors = [ 
                        { id: 0, hexColor: '#4286f4' },
                        { id: 1, hexColor: '#41f465' },
                        { id: 2, hexColor: '#f1f441' },
                        { id: 3, hexColor: '#f4bb41' },
                        { id: 4, hexColor: '#f44641' },
                        { id: 5, hexColor: '#4161f4' },
                        { id: 6, hexColor: '#7c41f4' },
                        { id: 7, hexColor: '#f441a6' }
                    ];

const colors = (state = tempColors, action) => {
	switch (action.type) {
		case 'RECEIVE_COLORS': // use this in homeScreen's componentDidMount // ACTUALLY, I may not need this
			return tempColors
        default:
            return state
    }
  }
  
export default colors