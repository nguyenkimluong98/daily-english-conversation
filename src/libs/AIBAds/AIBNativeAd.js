import React, { Component } from 'react';
import { Image, TouchableOpacity, StyleSheet, Platform, Linking, NativeModules } from 'react-native';
import AppConfig from '../../config/env';
import { unixTime } from '../../utils';
import I18n from 'react-native-i18n';
import Alamofire from '../Alamofire';
import Crypto from '../Crypto';
import APIConfig from './env';

export const AIBModule = NativeModules.AIBModule;

class AIBNativeAd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ad: null
    };

    let lang = 'en';
    if (I18n.currentLocale() && I18n.currentLocale().split('-').length == 2) {
      lang = I18n.currentLocale().split('-')[0];
    }

    this.loadAIBNativeAds(AppConfig.app_id, 'full', lang, ad => {
      this.setState({ ad });
    });
  }

  loadAIBNativeAds = (app_id, ad_size, lang, handler) => {
    const path = 'app_id=' + app_id + '&ad_size=' + ad_size + '&lang=' + lang + '&time=' + unixTime();
    const hash = Crypto.sha256(path, APIConfig.secret);
    const url = APIConfig.host + APIConfig.path.ad_native_request + '?' + path + '&token=' + hash;

    Alamofire.request(url, 'GET')
      .then(response => {
        const code = response.code;
        if (code == 3 && response.data) {
          handler(response.data);
        } else {
          handler(null);
        }
      })
      .catch(err => {
        handler(null);
      });
  };

  click = (ad_id, app_id, handler) => {
    const path = 'add_id=' + ad_id + '&app_id=' + app_id + '&time=' + unixTime();
    const hash = Crypto.sha256(path, APIConfig.secret);
    const url = APIConfig.host + APIConfig.path.ad_native_click + '?' + path + '&token=' + hash;

    Alamofire.request(url, 'GET')
      .then(response => {
        const code = response.code;
        if (code == 3) {
          handler('ok');
        } else {
          handler(null);
        }
      })
      .catch(err => {
        handler(null);
      });
  };

  render() {
    if (!this.state.ad) {
      return null;
    }
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.container}
        onPress={() => {
          const ad = this.state.ad;
          this.click(ad._id, AppConfig.app_id, () => {});

          if (this.state.ad.type == 'app') {
            Platform.select({
              ios: () => {
                const link = 'https://itunes.apple.com/us/app/id' + ad.package + '?mt=8';
                Linking.canOpenURL(link).then(supported => {
                  if (supported) {
                    Linking.openURL(link);
                  }
                });
              },
              android: () => {
                AIBModule.moreApp(ad.package);
              }
            })();
          }

          if (this.state.ad.type == 'website') {
            Linking.canOpenURL(this.state.ad.url).then(supported => {
              if (supported) {
                Linking.openURL(this.state.ad.url);
              }
            });
          }
        }}
      >
        <Image style={styles.banner} source={{ uri: this.state.ad.banner }} resizeMode={'contain'} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  banner: {
    width: '100%',
    height: '100%'
  }
});

export default AIBNativeAd;
