// Presentational Component

import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import PropTypes from 'prop-types'
import SavedColorItem from './SavedColorItem';

export default class SavedColorList extends Component {

	extractKey = ({id}) => id.toString();

	renderItem = ({ item }) => {
        console.log('item: ', item);
        return <SavedColorItem {...item} onPress={() => this.props.removeColor(item.hexColor)}></SavedColorItem>
    }

    renderSeparator = () => {
		return (
			<View style={ styles.separator } />
		);
	}; 

	render() {
        console.log('savedColors: ', this.props.savedColors);

		return (
			<View style={{ flex: 1, width: '100%' }}>
				<FlatList
					data={ this.props.savedColors }
					renderItem={ this.renderItem }
					keyExtractor={ this.extractKey }
					ItemSeparatorComponent={this.renderSeparator}
				/>
			</View>
			);
	}
}

const styles = StyleSheet.create({
    colors: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginTop: 10,
    },
    separator: {
		height: 1, 
		backgroundColor: "rgba(155, 155, 155, 0.4)"
	},
  });

  SavedColorList.propTypes = {
		savedColors: PropTypes.arrayOf(PropTypes.shape({
				hexColor: PropTypes.string.isRequired,
			}).isRequired).isRequired,
			removeColor: PropTypes.func.isRequired
  }