// Presentational Component

import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import PropTypes from 'prop-types'
import SavedColorItem from './SavedColorItem';
import { getUserColors } from '../../../db/UserColors';
import realm from '../../../db/helper';

export default class SavedColorList extends Component { // TODO: Get the rest of the pagination set up and related FlatList props online

	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			data: [],
			page: 1,
			error: null
		}
	}

	componentDidMount = () => {
		console.log('SavedColorList - componentDidMount');
		this.queryDatabase();
	}

	componentDidUpdate = (prevProps) => {
		console.log('SavedColorList - componentDidUpdate');
		if (this.props.numOfSavedColors != prevProps.numOfSavedColors) {
			this.updateResults();
		}
	}

	queryDatabase = () => { // temp note: named it this instead of makeRemoveRequest since we are working with a db here (refer: https://www.youtube.com/watch?v=rY0braBBlgw)
		this.setState({ loading: true });
		getUserColors({ page: this.state.page, numOfResults: 15 }, realm)
			.then((result) => {
				console.log('queryDatabase - result.data -', result.data);
				this.setState({
					data: [...this.state.data, ...result.data],
					error: result.error || null,
					loading: false
				})
			})

	}

	updateResults = () => {
		//console.log('SavedColorList - updateResults');
		
		// Reset the data list with a new retrieval of items from the db // TODO: Thinking of creating a method in order to reuse the getUserColor code that is being repeated
		this.setState({ loading: true });
		getUserColors({ page: this.state.page, numOfResults: 15 }, realm)
			.then((result) => {
				console.log('queryDatabase - result.data -', result.data);
				this.setState({
					data: result.data,
					error: result.error || null,
					loading: false
				})
			})
	}

	extractKey = ({id}) => id.toString();

	renderItem = ({ item }) => {
        console.log('item: ', item);
				return <SavedColorItem {...item} onPress={() => { this.props.removeColor(item.id, item.hexColor, this.props.isDeviceOnline) }}></SavedColorItem>
    }

    renderSeparator = () => {
		return (
			<View style={ styles.separator } />
		);
	}; 

	render() {

		return (
			<View style={{ flex: 1, width: '100%' }}>
				<FlatList
					data={ this.state.data }
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
		removeColor: PropTypes.func.isRequired,
		isDeviceOnline : PropTypes.bool.isRequired
  }