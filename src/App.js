/**
 * AIB Templates React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { View } from "react-native";
import { Provider } from "mobx-react/native";

import Store from "./stores/AppStore";
import RootNavigator from "./navigation/RootNavigator";
import { ifIphoneX } from "./utils";
import { AIBStatusBar } from "./components";

console.disableYellowBox = true;

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={Store}>
        <View style={{ flex: 1, ...ifIphoneX({ marginBottom: 30 }) }}>
          <RootNavigator />
        </View>
      </Provider>
    );
  }
}
