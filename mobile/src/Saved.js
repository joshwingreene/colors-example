import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class Saved extends Component {
  
    static navigationOptions = ({ navigation }) => {
		return {
			title: 'Your Colors'
		}
	};
    
    render() {
        return (
            <View style={styles.container}>
                <Text>Saved</Text>
            </View>
        );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
