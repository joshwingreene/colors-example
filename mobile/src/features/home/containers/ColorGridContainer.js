// Container Component

import { connect } from 'react-redux'
import ColorGrid from '../components/ColorGrid';
import { selectColor } from '../actions/index';

const mapStateToProps = state => ({ // Describes how to transform the current Redux store state into the props you want to pass to a presentational component you are wrapping
  colors: state.colors
})

const mapDispatchToProps = dispatch => ({ // Receives the dispatch() method and returns callback props that you want to inject into the presentational component
  selectColor: index => dispatch(selectColor(index))
})

const ColorGridContainer = connect( // pass the mapStateToProps and mapDispatchToProps functions as arguments and wrap the presentational component
  mapStateToProps,
  mapDispatchToProps
)(ColorGrid)

export default ColorGridContainer;