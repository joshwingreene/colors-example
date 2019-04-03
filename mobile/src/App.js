/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import AppContainer from './navigation/navigators';
import NavigationService from './navigation/service';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

import { checkConnectionStatus, recordConnectionStatus, executeSavedActions } from './utility/actions';
import { NetInfo } from 'react-native';

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
);

// Log the initial state
console.log('Initial State: ', store.getState());

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe(() => console.log(store.getState()))

// Check for the device's connection status
store.dispatch(checkConnectionStatus());

const handleConnectivityChange = (isConnected) => { // Note: Not consistent when using the iOS simulator - use a physical device
                                                    // https://github.com/react-native-community/react-native-netinfo/issues/7
  console.log('handleConnectivityChange Called - isConnected -', isConnected);
  store.dispatch(recordConnectionStatus(isConnected));

  //console.log('savedActionsData -', store.getState().savedActionsData);

  let savedActions = store.getState().savedActionsData.savedActions;

  // Dispatch the saved actions if there are any
  if (isConnected && savedActions.length != 0) {
    store.dispatch(executeSavedActions(savedActions));
  }
}

// Listen for connection changes
NetInfo.isConnected.addEventListener(
  'connectionChange',
  handleConnectivityChange
);

export default class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <AppContainer 
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </Provider>
    );
  }
}


