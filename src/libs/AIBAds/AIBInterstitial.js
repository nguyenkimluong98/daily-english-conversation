import { NativeModules, NativeEventEmitter, AsyncStorage } from 'react-native';

import AppConfig from '../../config/env';

const RNAdMobInterstitial = NativeModules.RNAdMobInterstitial;
const eventEmitter = new NativeEventEmitter(RNAdMobInterstitial);

const eventMap = {
  adLoaded: 'interstitialAdLoaded',
  adFailedToLoad: 'interstitialAdFailedToLoad',
  adOpened: 'interstitialAdOpened',
  adClosed: 'interstitialAdClosed',
  adLeftApplication: 'interstitialAdLeftApplication'
};

const _subscriptions = new Map();

const addEventListener = (event, handler) => {
  const mappedEvent = eventMap[event];
  if (mappedEvent) {
    let listener;
    if (event === 'adFailedToLoad') {
      listener = eventEmitter.addListener(mappedEvent, error => handler('err'));
    } else {
      listener = eventEmitter.addListener(mappedEvent, handler);
    }
    _subscriptions.set(handler, listener);
    return {
      remove: () => removeEventListener(event, handler)
    };
  } else {
    console.warn(`Trying to subscribe to unknown event: "${event}"`);
    return {
      remove: () => {}
    };
  }
};

const removeEventListener = (type, handler) => {
  const listener = _subscriptions.get(handler);
  if (!listener) {
    return;
  }
  listener.remove();
  _subscriptions.delete(handler);
};

const removeAllListeners = () => {
  _subscriptions.forEach((listener, key, map) => {
    listener.remove();
    map.delete(key);
  });
};

const showInterstitial = handler => {
  AsyncStorage.getItem('ads').then(response => {
    let ads = {
      google: {
        interstitial: AppConfig.ads.google.Interstitial
      }
    };

    if (response) {
      ads = JSON.parse(response);
    }

    RNAdMobInterstitial.setTestDevices(['SIMULATOR']);
    RNAdMobInterstitial.setAdUnitID(ads.google.interstitial);
    RNAdMobInterstitial.requestAd()
      .then(() => {
        RNAdMobInterstitial.showAd().catch(err => {
          handler(err);
        });
      })
      .catch(err => {
        handler(err);
      });
  });
};

export default {
  addEventListener,
  removeEventListener,
  removeAllListeners,
  showInterstitial
};
