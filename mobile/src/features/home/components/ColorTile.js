// Presentational Component

import React, { Component } from 'react';
import { View, TouchableHighlight, StyleSheet } from 'react-native';
import PropTypes from 'prop-types'

export default class ColorTile extends Component { // Thinking about changing this into a const function

	render() {
		return (
            <TouchableHighlight
                underlayColor={this.props.color.hexColor}                
                accessibilityRole="link"
                onPress={this.props.onPress}
                >
                    <View style={ [ styles.color, { backgroundColor: this.props.color.hexColor } ]}></View>
            </TouchableHighlight>
		);
	}
}

const styles = StyleSheet.create({
    color: {
      width: 100,
      height: 150,
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 20,
    },
  });

ColorTile.propTypes = {
	color: PropTypes.shape({
      hexColor: PropTypes.string.isRequired,
      isSaved: PropTypes.bool.isRequired,
	}).isRequired
  }