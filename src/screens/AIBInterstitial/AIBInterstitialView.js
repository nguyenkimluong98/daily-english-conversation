import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import I18n from '../../locales/i18n';
import { AIBNativeAd } from '../../libs/AIBAds';

export default class AIBInterstitialView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countDownTime: 6
    };

    const myInterval = setInterval(() => {
      if (this.state.countDownTime > 0) {
        const countDownTime = this.state.countDownTime - 1;
        this.setState({ countDownTime });
      } else {
        clearInterval(myInterval);
      }
    }, 1000);
  }

  render() {
    const { goBack, onAdClick } = this.props;
    return (
      <View style={styles.container}>
        <AIBNativeAd onAdClick={onAdClick} />

        <TouchableOpacity
          style={[
            styles.button_exit,
            { width: this.state.countDownTime == 0 ? 80 : 30, borderRadius: this.state.countDownTime == 0 ? 3 : 15 }
          ]}
          onPress={() => {
            if (this.state.countDownTime == 0) {
              goBack();
            }
          }}
        >
          <Text style={styles.button_exit_text_countdowntime}>
            {this.state.countDownTime == 0 ? 'x ' : this.state.countDownTime > 5 ? 5 : this.state.countDownTime}
          </Text>

          {this.state.countDownTime == 0 ? (
            <Text style={styles.button_exit_text}>{I18n.t('close').toUpperCase()}</Text>
          ) : null}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  button_exit: {
    position: 'absolute',
    top: 10,
    right: 5,
    height: 30,
    backgroundColor: '#686868',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  button_exit_text: {
    color: 'white',
    fontWeight: 'bold'
  },
  button_exit_text_countdowntime: {
    color: 'white',
    alignSelf: 'center'
  }
});
