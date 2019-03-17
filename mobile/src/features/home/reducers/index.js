import fetchedColors from './fetchedColors';
import selectedColorIndex from './selectedColorIndex';

export default function homeData(state = {}, action) {
	console.log('homeData - state - ', state);
	return {
		fetchedColors: fetchedColors(state.fetchedColors, action),
		selectedColorIndex: selectedColorIndex(state.selectedColorIndex, action)
	}
}