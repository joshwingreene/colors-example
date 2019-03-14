import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class Home extends Component {
  
  static navigationOptions = ({ navigation }) => {
		return {
			title: 'Colors'
		}
	};

  render() {
    return (
      <View style={styles.container}>
        <Text>Home</Text>
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
