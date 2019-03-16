// Mixed Component

import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { toggleColor } from '../../actions';

class DetailScreen extends Component { // DetailScreen's container components will be invoked here
    
    static navigationOptions = ({ navigation }) => {

        const params = navigation.state.params || {};

        console.log('navigationOptions - params: ', params);

        if (params.selectedColor && params.toggleColor && params.selectedColorIndex != null) { // changed params.colorIndex to != null since 0 is equal to false in javascript

            return {
                title: 'Color',
                headerRight: (
                    <Button
                        onPress={() => {
                                params.toggleColor(params.selectedColorIndex);
                            }
                        }
                        title={ params.selectedColor.isSaved ? 'Saved' : 'Save' }
                    />
                )
            }
        }
    };

    componentDidMount = () => {
        console.log('componentDidMount');

        this.props.navigation.setParams( { selectedColorIndex: this.props.selectedColorIndex, selectedColor: this.props.color, toggleColor: (index) => this.props.dispatch(toggleColor(index)) });
        //this.props.navigation.setParams( { toggleColor: (index) => this.props.toggleColor(index) }); // ex - if I wanted to use mapDispatchToProps
    }

    updateColorParam = () => { // This is the only way in which I was able to update the color param after the app state was changed after Save/Saved toggle is pressed. (while following the design anyways)
        this.props.navigation.setParams( { selectedColor: this.props.color });
    }

    render() {
        console.log('DetailScreen - render');

        console.log('selectedColor: ', this.props.color);

        console.log('detailScreen - params - ', this.props.navigation.state.params); // undefined at first (defined once setParams is called by componentDidMount)

        if (this.props.navigation.state.params && this.props.navigation.state.params.selectedColor.isSaved != this.props.color.isSaved) {
            console.log('navigationOptions and this.props.color aren\'t the same');
            this.updateColorParam();
        }

		return (
			<View style={ styles.container }>
                <View style={[ styles.coloredView, { backgroundColor: this.props.color.hexColor } ]}></View>
                <Text style={ styles.hexColorText }>{ this.props.color.hexColor }</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: 'center'
    },
    coloredView: {
        width: '100%', height: '50%'
    },
    hexColorText: {
        marginTop: 20, fontWeight: '700', fontSize: 25
    }
});

const getChosenColor = (colors, selectedColorIndex) => {
    return colors.filter((color, index) => index == selectedColorIndex)[0];
}

const mapStateToProps = (state) => ({ // Describes how to transform the current Redux store state into the props you want to pass to a presentational component you are wrapping
    color: getChosenColor(state.colors, state.selectedColorIndex),
    selectedColorIndex: state.selectedColorIndex
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

