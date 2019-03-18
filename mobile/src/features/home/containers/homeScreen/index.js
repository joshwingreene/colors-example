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
                <ColorGridContainer pushToScreen={ () => this.props.navigation.navigate('Detail') } />
			</View>
		)
	}
}

export default connect()(HomeScreen);