import { NavigationActions } from "react-navigation";
import * as screenNames from "../screen_names";
//import RNExitApp from "react-native-exit-app";

// Thinking of keeping this

export const navigateBack = () => NavigationActions.back();

export const navigateToDetail = () =>
  NavigationActions.navigate({
    routeName: screenNames.DETAIL
  });

/*
export const exitApp = () => {
  RNExitApp.exitApp();
};
*/