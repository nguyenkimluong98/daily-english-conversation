import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import Colors from '../../constants/Colors';
import { isIphoneX } from '../../utils';

class V extends Component {
  render() {
    return (
      <View>
        {isIphoneX() ? (
          <View style={{ height: 30, backgroundColor: Colors.colorPrimary }} />
        ) : (
          <View style={{ height: 10, backgroundColor: Colors.colorPrimary }} />
        )}
        <StatusBar backgroundColor={Colors.colorPrimaryDark} barStyle="light-content" />
      </View>
    );
  }
}
export default V;
