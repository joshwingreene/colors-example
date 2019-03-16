import React, {Component} from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import { toggleBtn } from '../../actions';

class SettingsScreen extends Component {

    static navigationOptions = () => ({
        title: 'Settings'
    });

    render() {
        console.log('toggleValue: ', this.props.toggleValue);

        return (
            <View style={ styles.container }>
                <Button
                    onPress={() => this.props.toggleBtn()}
                    title={ this.props.toggleValue ? 'ON' : 'OFF' }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    }
});

const mapStateToProps = state => ({
    toggleValue: state.settingsToggleValue
});

const mapDispatchToProps = dispatch => ({
    toggleBtn: () => dispatch(toggleBtn())
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
