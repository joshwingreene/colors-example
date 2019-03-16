// Presentational Component

import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

const SavedColorItem = ({ onPress, hexColor }) => (
  <View
    onPress={onPress}
    style={ styles.container }
  	>
        <View style={[ styles.colorPreview, { backgroundColor: hexColor } ]}>

        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ marginLeft: 15 }}>
                { hexColor }
            </Text>
            <Button
                onPress={onPress}
                title='Remove'
            />
        </View>
        
  </View>
)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', height: 50, alignItems: 'center'
    },
    colorPreview: {
        height: 50, width: 50
    }
});

SavedColorItem.propTypes = {
  onPress: PropTypes.func.isRequired,
  hexColor: PropTypes.string.isRequired
}

export default SavedColorItem