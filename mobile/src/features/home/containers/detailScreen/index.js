// Mixed Component

import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { toggleColor, resetColorSelection } from '../../actions';

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
        console.log('DetailScreen - componentDidMount');

        this.props.navigation.setParams( { selectedColorIndex: this.props.selectedColorIndex, selectedColor: this.props.color, toggleColor: (index) => this.props.dispatch(toggleColor(index)) });
    }

    componentWillUnmount = () => {
        console.log('DetailScreen - componentWillUnmount');
        this.props.dispatch(resetColorSelection());
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
    color: getChosenColor(state.colorsData.colors, state.colorsData.selectedColorIndex),
    selectedColorIndex: state.colorsData.selectedColorIndex
})

export default connect(mapStateToProps, null)(DetailScreen);

