import fetchedColorData from './fetchedColorData';
import selectedColorIndex from './selectedColorIndex';

export default function homeData(state = {}, action) {
	console.log('homeData - state - ', state);
	return {
		fetchedColorData: fetchedColorData(state.fetchedColorData, action),
		selectedColorIndex: selectedColorIndex(state.selectedColorIndex, action)
	}
}