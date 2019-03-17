import React, {Component} from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import { fetchToggleValue, toggleBtn } from '../../actions';

class SettingsScreen extends Component {

    static navigationOptions = () => ({
        title: 'Settings'
    });

    componentDidMount = () => {
        //this.props.dispatch(fetchToggleValue()); // think I'll need this for the database or online functionlity
    }

    render() {
        
        return (
            <View style={ styles.container }>
                <Button onPress={() => this.props.toggleBtn()} title={ this.props.toggleValue ? 'ON' : 'OFF' }/>
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
    toggleValue: state.settingsData.toggleValue
})

const mapDispatchToProps = dispatch => ({
    toggleBtn: () => dispatch(toggleBtn()),
    dispatch
    // Note about the use of dispatch here:
    /* Per the Redux FAQ question at http://redux.js.org/docs/FAQ.html#react-props-dispatch, this.props.dispatch is 
       available by default if you do not supply your own mapDispatchToProps function. If you do supply a mapDispatchToProps
       function, you are responsible for returning a prop named dispatch yourself. */
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
