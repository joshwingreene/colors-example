// Mixed Component

import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { saveColor, resetColorSelection } from '../../actions';
import { removeColor } from '../../../saved/actions';
import { getUserColor } from '../../../../db/UserColors';
import realm from '../../../../db/helper';

class DetailScreen extends Component { // DetailScreen's container components will be invoked here
    
    static navigationOptions = ({ navigation }) => {

        const params = navigation.state.params || {};

        console.log('navigationOptions - params: ', params);

        if (params.saveColor && params.removeColor && params.isColorSaved != null) {

            return {
                title: 'Color',
                headerRight: (
                    <Button
                        onPress={() => {
                                if (params.isColorSaved) {
                                    params.removeColor();
                                } else {
                                    params.saveColor();
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
            saveColor: this.handleSaveColor,
            removeColor: this.handleRemoveColor,
            //isDeviceOnline: this.props.isDeviceOnline
        });

        this.handleSetSavedStatusInHeader();
    }

    componentDidUpdate = (prevProps) => {
        console.log('DetailScreen - componentDidUpdate');
        if (this.props.numOfSavedColors != prevProps.numOfSavedColors) {
			this.handleSetSavedStatusInHeader();
		}
    }

    componentWillUnmount = () => {
        console.log('DetailScreen - componentWillUnmount');
        this.props.dispatch(resetColorSelection());
    }

    handleSetSavedStatusInHeader = () => {
        getUserColor({ hexColor: this.props.color.hexColor }, realm)
                .then((item) => {
                    console.log('getUserColor - item -', item);
                    //console.log('getUserColor - item length -', item.length);
                    if (item.data) {
                        this.props.navigation.setParams({ isColorSaved: true });
                    } else {
                        this.props.navigation.setParams({ isColorSaved: false });
                    }
            });
    }

    handleSaveColor = () => {
        this.props.dispatch(saveColor(this.props.color.hexColor, this.props.isDeviceOnline));
    }

    handleRemoveColor = () => {
        getUserColor({ hexColor: this.props.color.hexColor }, realm)
                .then((result) => {
                    console.log('handleRemoveColor - getUserColor - item -', result);
                    //console.log('getUserColor - item length -', item.length);
                    if (result.data) {
                        this.props.dispatch(removeColor(result.data.id, result.data.hexColor, this.props.isDeviceOnline));
                    }
            });
    }

    render() {
        console.log('DetailScreen - render');

        console.log('selectedColor: ', this.props.color);

        console.log('detailScreen - params - ', this.props.navigation.state.params); // undefined at first (defined once setParams is called by componentDidMount)

        console.log('DetailScren - isDeviceOnline -', this.props.isDeviceOnline);

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

const getChosenColor = (fetchedColors, selectedColorIndex) => {
    return fetchedColors[selectedColorIndex];
}

const mapStateToProps = (state) => ({ // Describes how to transform the current Redux store state into the props you want to pass to a presentational component you are wrapping
    color: getChosenColor(state.homeData.fetchedColorData.fetchedColors, state.homeData.selectedColorIndex),
    selectedColorIndex: state.homeData.selectedColorIndex,
    isDeviceOnline: state.connectionData.isDeviceOnline,
    numOfSavedColors: state.savedData.numOfSavedColors
})

export default connect(mapStateToProps, null)(DetailScreen);

