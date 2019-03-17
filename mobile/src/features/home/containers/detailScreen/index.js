// Mixed Component

import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { saveColor, resetColorSelection } from '../../actions';
import { removeColor } from '../../../saved/actions';

class DetailScreen extends Component { // DetailScreen's container components will be invoked here
    
    static navigationOptions = ({ navigation }) => {

        const params = navigation.state.params || {};

        console.log('navigationOptions - params: ', params);

        if (params.selectedColor && params.saveColor && params.removeColor && params.isColorSaved != null) {

            return {
                title: 'Color',
                headerRight: (
                    <Button
                        onPress={() => {
                                if (params.isColorSaved) {
                                    params.removeColor(params.selectedColor.hexColor);
                                } else {
                                    params.saveColor(params.selectedColor.hexColor);
                                }  
                            }
                        }
                        title={ params.isColorSaved ? 'Saved' : 'Save' }
                    />
                )
            }
        }
    };

    componentDidMount = () => {
        console.log('DetailScreen - componentDidMount');

        this.props.navigation.setParams({ 
            selectedColor: this.props.color, 
            saveColor: (hexColor) => this.props.dispatch(saveColor(hexColor)),
            removeColor: (hexColor) => this.props.dispatch(removeColor(hexColor)),
            isColorSaved: this.checkIfColorIsSaved()
        });
    }

    componentWillUnmount = () => {
        console.log('DetailScreen - componentWillUnmount');
        this.props.dispatch(resetColorSelection());
    }

    updateColorSavedParam = () => { // Like with updateColorParams from before, this is the only way in which I was able to update the color param after the app state was changed after Save/Saved toggle is pressed. (while following the design anyways)
        this.props.navigation.setParams( { isColorSaved: this.checkIfColorIsSaved() });
    }

    checkIfColorIsSaved = () => {
        let isSaved = false;
    
        console.log('checkIfColorIsSaved - savedColors - ', this.props.savedColors);

        for (let i = 0; i < this.props.savedColors.length; i++) {
            if (this.props.savedColors[i].hexColor == this.props.color.hexColor ) {
                isSaved = true;
            }
        }

        return isSaved;
    }

    render() {
        console.log('DetailScreen - render');

        console.log('selectedColor: ', this.props.color);

        console.log('detailScreen - params - ', this.props.navigation.state.params); // undefined at first (defined once setParams is called by componentDidMount)

        if (this.props.navigation.state.params && this.props.navigation.state.params.isColorSaved != this.checkIfColorIsSaved() ) {
            console.log('navigationOptions\'s isColorSaved and result of checkIfColorIsSaved aren\'t the same');
            this.updateColorSavedParam();
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
    color: getChosenColor(state.homeData.fetchedColors, state.homeData.selectedColorIndex),
    selectedColorIndex: state.homeData.selectedColorIndex,
    savedColors: state.savedData.savedColors
})

export default connect(mapStateToProps, null)(DetailScreen);

