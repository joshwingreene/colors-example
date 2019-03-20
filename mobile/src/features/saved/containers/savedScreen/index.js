// Mixed Component

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { connect } from 'react-redux';
import SavedColorListContainer from './SavedColorListContainer';

class SavedScreen extends Component {
  
    static navigationOptions = ({ navigation }) => {
		return {
			title: 'Your Saved Colors'
		}
	};
    
    render() {
        return (
            <View style={styles.container}>
                { this.props.savedColors.length != 0 ? 
                    <SavedColorListContainer savedColors={ this.props.savedColors } /> : 
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontWeight: '700', fontSize: 25 }}>No Saved Colors</Text></View>
                }
            </View>
        );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const mapStateToProps = state => ({ // savedColors - each item needs to have a unique id for the FlatList in SavedColorList
  savedColors: state.savedData.savedColors.map((color) => ({ id: color.id, hexColor: color.hexColor }))
});

export default connect(mapStateToProps, null)(SavedScreen);
