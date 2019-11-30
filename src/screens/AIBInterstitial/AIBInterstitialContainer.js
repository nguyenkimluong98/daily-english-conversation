import React, { Component } from 'react';
import { BackHandler, AppState } from 'react-native';
import AIBInterstitialView from './AIBInterstitialView';

import { goBack } from '../../utils';

export default class AIBInterstitialScreen extends Component {
  constructor(props) {
    super(props);
    this.adClick = false;
  }

  _goBack = () => {
    goBack(this.props.navigation);
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleBackPress = () => {
    return true;
  };

  handleAppStateChange = () => {
    if (this.adClick) {
      this._goBack();
    }
  };

  _OnAdClick = () => {
    this.adClick = true;
  };

  render() {
    return (
      <AIBInterstitialView {...this.props} exitApp={this._exitApp} goBack={this._goBack} onAdClick={this._OnAdClick} />
    );
  }
}
