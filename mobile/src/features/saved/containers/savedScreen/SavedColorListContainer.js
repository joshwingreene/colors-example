// Container Component

import { connect } from 'react-redux'
import SavedColorList from '../../components/SavedColorList';
import { removeColor } from '../../actions';

const mapDispatchToProps = dispatch => ({ // Receives the dispatch() method and returns callback props that you want to inject into the presentational component
  removeColor: hexColor => dispatch(removeColor(hexColor))
})

const SavedColorListContainer = connect( // pass the mapStateToProps and mapDispatchToProps functions as arguments and wrap the presentational component
  null,
  mapDispatchToProps
)(SavedColorList)

export default SavedColorListContainer;