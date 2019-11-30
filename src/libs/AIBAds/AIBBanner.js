import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { AdMobBanner } from 'react-native-admob';
import AppConfig from '../../config/env';

class AdBanner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      google_banner: null,
      adFailedToLoad: false
    };

    this.setupAds();
  }

  setupAds = () => {
    AsyncStorage.getItem('ads').then(response => {
      if (response) {
        const ads = JSON.parse(response);
        this.setState({
          google_banner: ads.google.banner
        });
      } else {
        this.setState({
          google_banner: AppConfig.ads.google.Banner
        });
      }
    });
  };

  render() {
    if (!this.state.google_banner || this.state.adFailedToLoad) {
      return null;
    }

    return (
      <AdMobBanner
        adSize="banner"
        adUnitID={this.state.google_banner}
        testDevices={[AdMobBanner.simulatorId]}
        onAdFailedToLoad={error => {
          this.setState({ adFailedToLoad: true });
        }}
      />
    );
  }
}

export default AdBanner;
