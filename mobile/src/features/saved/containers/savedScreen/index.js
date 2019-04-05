// Mixed Component

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { connect } from 'react-redux';
import SavedColorListContainer from './SavedColorListContainer';
import { getNumOfUserColors } from '../../../../db/UserColors';
import realm from '../../../../db/helper';

class SavedScreen extends Component {
  
    static navigationOptions = ({ navigation }) => {
        return {
          title: 'Your Saved Colors'
        }
    };

    componentDidMount = () => {
      console.log('SavedScreen - componentDidMount');
    }

    componentDidUpdate = () => {
      console.log('SavedScreen - componentDidUpdate');
    }
    
    render() {
        return (
            <View style={styles.container}>
                { this.props.numOfSavedColors != 0 ?
                    <SavedColorListContainer /> : 
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
  numOfSavedColors: state.savedData.numOfSavedColors
});

export default connect(mapStateToProps, null)(SavedScreen);
