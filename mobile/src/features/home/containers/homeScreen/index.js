import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux'
import ColorGridContainer from '../ColorGridContainer';
import { fetchColors, fetchUserColors } from '../../actions';

class HomeScreen extends Component { // HomeScreen's container components will be invoked here

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Colors'
        }
    };

    componentDidMount = () => {
        console.log('componentDidMount');
        //this.apiCallsIfOnline();
    }

    componentDidUpdate = () => {
        console.log('componentDidUpdate');
        //this.apiCallsIfOnline();
    }

    /*
    apiCallsIfOnline = () => {
        if (this.props.isDeviceOnline && (this.props.savedActions.length == 0) && (this.props.isPostingColor == false)) { 
            this.props.dispatch(fetchColors());
            this.props.dispatch(fetchUserColors());
        }
    }
    */

    render() {
        console.log('render');
		return ( // NavigationService wasn't needed here.  
			<View style={{ flex: 1 }}>
                <ColorGridContainer pushToScreen={ () => this.props.navigation.navigate('Detail') } />
			</View>
		)
	}
}

const mapStateToProps = state => ({
    //isDeviceOnline: state.connectionData.isDeviceOnline,
    //savedActions: state.savedActionsData.savedActions,
    //isPostingColor: state.savedData.isPostingColor
})

export default connect(mapStateToProps, null)(HomeScreen);