import React, { Component } from 'react';
import { View, Image, Text, FlatList, TouchableOpacity, Linking, Platform, NativeModules } from 'react-native';
import Alamofire from '../../libs/Alamofire';
import { unixTime } from '../../utils';
import Crypto from '../Crypto';
import { AIBEmptyView, AIBToolbar } from '../../components';
import Config from '../../config/env';
import APIConfig from './env';

export const AIBModule = NativeModules.AIBModule;

class MoreApps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apps: []
    };

    if (Config.app_id && Config.app_id.trim().length > 0) {
      this.loadAds(Config.app_id);
    }
  }

  loadAds = app_id => {
    const path = 'app_id=' + app_id + '&time=' + unixTime();
    const hash = Crypto.sha256(path, APIConfig.secret);
    const url = APIConfig.host + APIConfig.path.ad_more_apps + '?' + path + '&token=' + hash;

    Alamofire.request(url, 'GET').then(response => {
      const code = response.code;
      if (code == 3) {
        this.setState({ apps: response.data });
      }
    });
  };

  adClick = index => {
    const app = this.state.apps[index];
    const path = 'app_id=' + app._id + '&from=' + Config.app_id + '&time=' + unixTime();
    const hash = Crypto.sha256(path, APIConfig.secret);
    const url = APIConfig.host + APIConfig.path.ad_more_apps_click + '?' + path + '&token=' + hash;

    Alamofire.request(url, 'GET').catch();

    Platform.select({
      ios: () => {
        const link = 'https://itunes.apple.com/us/app/id' + app.package + '?mt=8';
        Linking.canOpenURL(link).then(supported => {
          if (supported) {
            Linking.openURL(link);
          }
        });
      },
      android: () => {
        AIBModule.moreApp(app.package);
      }
    })();
  };

  _renderItem = ({ item, index }) => {
    const locales = item.locales[0];
    return (
      <TouchableOpacity activeOpacity={1} onPress={() => this.adClick(index)}>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              style={{ width: 60, height: 60, borderRadius: 15, borderColor: '#E8E6E6', borderWidth: 1 }}
              source={{ uri: locales.icon }}
            />
            <View style={{ marginLeft: 10, marginRight: 90, alignContent: 'center', justifyContent: 'center' }}>
              <Text
                style={{ fontWeight: 'bold', color: 'black', fontSize: 18, marginRight: 70 }}
                numberOfLines={2}
                ellipsizeMode="tail"
                pointerEvents="none"
              >
                {locales.name}
              </Text>
              <Text
                style={{ color: '#8e8e92', marginRight: 70 }}
                numberOfLines={1}
                ellipsizeMode="tail"
                pointerEvents="none"
              >
                {locales.description}
              </Text>
            </View>

            <TouchableOpacity
              style={{ position: 'absolute', right: 10, alignSelf: 'center' }}
              onPress={() => this.adClick(index)}
            >
              <View
                style={{
                  backgroundColor: '#f0f0f6',
                  width: 80,
                  height: 35,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignContent: 'center'
                }}
              >
                <Text style={{ alignSelf: 'center', color: '#1863ee', fontWeight: 'bold' }}>GET APP</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 5, marginLeft: 70, height: 0.5, backgroundColor: '#E8E6E6' }} />
          <View style={{ height: 10 }} />
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    if (this.state.apps.length == 0) {
      return (
        <View style={{ flex: 1 }}>
          <AIBEmptyView />
          <AIBToolbar title={'More Great Apps'} backCallback={() => this.props.backCallback()} />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <AIBToolbar title={'More Great Apps'} backCallback={() => this.props.backCallback()} />
        <FlatList
          style={{ backgroundColor: 'white', paddingTop: 10 }}
          data={this.state.apps}
          renderItem={(item, index) => this._renderItem(item, index)}
          keyExtractor={(item, index) => index + ''}
        />
      </View>
    );
  }
}

export default MoreApps;
