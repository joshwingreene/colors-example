// Mixed Component

import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { toggleColor } from '../../actions';

class DetailScreen extends Component { // DetailScreen's container components will be invoked here
    
    static navigationOptions = ({ navigation }) => {

        const params = navigation.state.params || {};

        if (params.colorFromState && params.colorIndex && params.toggleColor) {

            return {
                title: 'Color',
                headerRight: (
                    <Button
                        onPress={() => {
                                params.toggleColor(params.colorIndex);
                            }
                        }
                        title={ params.colorFromState.isSaved ? 'Saved' : 'Save' }
                    />
                )
            }
        }
    };

    componentDidMount = () => {
        console.log('componentDidMount');

        this.props.navigation.setParams( { colorFromState: this.props.color, toggleColor: (index) => this.props.dispatch(toggleColor(index)) });
        //this.props.navigation.setParams( { toggleColor: (index) => this.props.toggleColor(index) }); // ex - if I wanted to use mapDispatchToProps
    }

    updateColorParam = () => { // This is the only way in which I was able to update the color param after the app state is changed after Save/Saved toggle is pressed.
        this.props.navigation.setParams( { colorFromState: this.props.color });
    }

    render() {
        console.log('DetailScreen - render');

        console.log('colorFromState: ', this.props.color);

        if (this.props.navigation.state.params.colorFromState && this.props.navigation.state.params.colorFromState.isSaved != this.props.color.isSaved) {
            console.log('navigationOptions and this.props.color aren\'t the same');
            this.updateColorParam();
        }

		return (
			<View style={{ flex: 1, alignItems: 'center' }}>
                <Text>{ this.props.color.hexColor }</Text>
			</View>
		)
	}
}

const getChosenColor = (colors, selectedColorIndex) => {
    return colors.filter((color, index) => index == selectedColorIndex)[0];
}

const mapStateToProps = (state) => ({ // Describes how to transform the current Redux store state into the props you want to pass to a presentational component you are wrapping
    color: getChosenColor(state.colors, state.selectedColorIndex)
})

/* ex - if I wanted to use mapDispatchToProps
const mapDispatchToProps = dispatch => ({ // Receives the dispatch() method and returns callback props that you want to inject into the presentational component
    toggleColor: index => dispatch(toggleColor(index)), // Will inject a prop called toggleColor into the ColorGrid component, and toggleColor dispatches a TOGGLE_COLOR action
    // TODO: toggleColor will be moved to the detailScreen (I'll add a mapStateToProps function there)
    // This functionality will also be removed from the ColorGrid and ColorTile
  })

export default connect(null, mapDispatchToProps)(DetailScreen);
*/

export default connect(mapStateToProps, null)(DetailScreen);

