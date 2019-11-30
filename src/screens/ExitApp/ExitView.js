import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import I18n from '../../locales/i18n';
import Colors from '../../constants/Colors';
import { AIBNativeAd } from '../../libs/AIBAds';

const { width } = Dimensions.get('screen');
export default class ExitView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { exitApp, goBack } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.exit_message}>{I18n.t('exitContent')}</Text>

        <View style={styles.button_view}>
          <TouchableOpacity style={styles.button_exit} onPress={() => exitApp()}>
            <Text style={styles.button_exit_text}>{I18n.t('exit').toUpperCase()}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button_cancel} onPress={() => goBack()}>
            <Text style={styles.button_cancel_text}>{I18n.t('cancel').toUpperCase()}</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, marginTop: 5 }}>
          <AIBNativeAd />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  exit_message: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    margin: 10
  },
  button_view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: width / 8,
    marginRight: width / 8
  },
  button_cancel: {
    width: width / 3,
    height: 40,
    backgroundColor: Colors.colorAccent,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button_exit: {
    width: width / 3,
    height: 40,
    backgroundColor: Colors.colorAccent,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button_exit_text: {
    color: 'white',
    fontSize: 16
  },
  button_cancel_text: {
    color: 'white',
    fontSize: 16
  }
});
