import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';
import LottieView from 'lottie-react-native';

export default class EmptyView extends Component {
  render() {
    return (
      // <View style={styles.container}>
      <LottieView
        style={styles.container}
        source={require('../../assets/lottiefiles/loading_animation.json')}
        autoPlay
        loop
      />
      // </View>
    );
  }
}
