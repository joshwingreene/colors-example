import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux'
import ColorGridContainer from '../ColorGridContainer';
import NavigationService from '../../../../navigation/service';

class HomeScreen extends Component { // HomeScreen's container components will be invoked here
    
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Colors'
        }
    };

    render() {
		return (
			<View style={{ flex: 1 }}>
                <ColorGridContainer pushToScreen={ (index) => NavigationService.navigate('Detail', { colorIndex: index }) } /> 
			</View>
		)
	}
}

export default connect()(HomeScreen);