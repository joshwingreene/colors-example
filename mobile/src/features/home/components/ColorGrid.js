// Presentational Component

import React, { Component } from 'react';
import { View, TouchableHighlight, ScrollView, StyleSheet } from 'react-native';
import PropTypes from 'prop-types'
import ColorTile from './ColorTile';

export default class ColorGrid extends Component {

	render() {

        console.log('ColorGrid - colors: ', this.props.colors);

		return (
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                <View style={styles.colors}>
                    { this.props.colors.map((color, index) => (
                        <ColorTile key={index} color={color} onPress={ () => {
                            this.props.selectColor(index);
                            this.props.pushToScreen()
                            } } />
                    ))}
                </View>
            </ScrollView>
		);
	}
}

const styles = StyleSheet.create({
    colors: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginTop: 10,
    }
  });

ColorGrid.propTypes = {
	colors: PropTypes.arrayOf(PropTypes.shape({
      hexColor: PropTypes.string.isRequired,
      isSaved: PropTypes.bool.isRequired,
	}).isRequired).isRequired
  }