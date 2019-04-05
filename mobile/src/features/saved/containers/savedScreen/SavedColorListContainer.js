// Container Component

import { connect } from 'react-redux'
import SavedColorList from '../../components/SavedColorList';
import { removeColor } from '../../actions';

const mapStateToProps = state => ({
  isDeviceOnline: state.connectionData.isDeviceOnline,
  numOfSavedColors: state.savedData.numOfSavedColors,
})

const mapDispatchToProps = dispatch => ({ // Receives the dispatch() method and returns callback props that you want to inject into the presentational component
  removeColor: (id, hexColor, isDeviceOnline) => dispatch(removeColor(id, hexColor, isDeviceOnline))
})

const SavedColorListContainer = connect( // pass the mapStateToProps and mapDispatchToProps functions as arguments and wrap the presentational component
  mapStateToProps,
  mapDispatchToProps
)(SavedColorList)

export default SavedColorListContainer;