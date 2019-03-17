import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux'
import ColorGridContainer from '../ColorGridContainer';
import { fetchColors } from '../../actions';

class HomeScreen extends Component { // HomeScreen's container components will be invoked here

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Colors'
        }
    };

    componentDidMount = () => {
        console.log('componentDidMount');
        this.props.dispatch(fetchColors());
    }

    render() {
        console.log('render');
		return ( // NavigationService wasn't needed here.  
			<View style={{ flex: 1 }}>
                { this.props.colorsData ? <ColorGridContainer pushToScreen={ () => this.props.navigation.navigate('Detail') } /> : null }
			</View>
		)
	}
}

const mapStateToProps = state => {
    console.log('HomeScreen - mapStateToProps - state - ', state); // state is an empty object at first. Because of this, I check for colorsData before rendering the ColorGridContainer
  
    return { // Describes how to transform the current Redux store state into the props you want to pass to a presentational component you are wrapping
        colorsData: state.colorsData,
  }
}

export default connect(mapStateToProps, null)(HomeScreen);