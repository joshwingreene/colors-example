import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux'
import ColorGridContainer from '../ColorGridContainer';

class HomeScreen extends Component { // HomeScreen's container components will be invoked here
    
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Colors'
        }
    };

    render() {
		return ( // NavigationService wasn't needed here. I'm thinking about possibly calling this code as a thunk in the selectColor action  
			<View style={{ flex: 1 }}>
                <ColorGridContainer pushToScreen={ () => this.props.navigation.navigate('Detail') } /> 
			</View>
		)
	}
}

export default connect()(HomeScreen);