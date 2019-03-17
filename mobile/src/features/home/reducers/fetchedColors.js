const staticFetchedColors = [ // will be removed when the API is up-and-running
	{ hexColor: '#4286f4' },
	{ hexColor: '#41f465' },
	{ hexColor: '#f1f441' },
	{ hexColor: '#f4bb41' },
	{ hexColor: '#f44641' },
	{ hexColor: '#4161f4' },
	{ hexColor: '#7c41f4' },
	{ hexColor: '#f441a6' }
];

export default function fetchedColors(fetchedColors = staticFetchedColors, action) {
	switch(action.type) {
		/*
		case 'FETCH_COLORS':
			return state
		*/
		default:
			return fetchedColors
	}
}