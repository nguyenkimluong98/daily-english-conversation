import { AsyncStorage } from 'react-native';
import { showProgressDialog, hideProgressDialog, startActivityForResult } from './index';
import { AIBInterstitial } from '../libs/AIBAds';
import I18n from '../locales/i18n';

export const clearCallback = callback => {
  AIBInterstitial.removeAllListeners();
  hideProgressDialog();
  callback();
};

export const showAdInterstitial = (navigation, percent, showDialog, callback) => {
  AsyncStorage.getItem('ads').then(response => {
    let isShowGoogleAd = true;

    if (navigation && response) {
      const ad = JSON.parse(response);
      if (ad.custom && ad.custom.aib_interstitial) {
        const p = Math.floor(Math.random() * 100) + 1;
        if (p <= ad.custom.aib_interstitial) {
          isShowGoogleAd = false;
        }
      }
    }

    if (isShowGoogleAd) {
      showGoogleInterstitialAd(percent, showDialog, callback);
    } else {
      showAIBInterstitialAd(navigation, percent, () => setTimeout(callback, 100));
    }
  });
};

export const showGoogleInterstitialAd = (percent, showDialog, callback) => {
  const rd = Math.floor(Math.random() * 100) + 1;
  if (rd <= percent) {
    if (showDialog) {
      showProgressDialog(I18n.t('adInterstitialShowing'));
    }

    AIBInterstitial.addEventListener('adLoaded', () => {
      if (showDialog) {
        hideProgressDialog();
      }
    });
    AIBInterstitial.addEventListener('adFailedToLoad', () => clearCallback(callback));
    AIBInterstitial.addEventListener('adClosed', () => clearCallback(callback));
    AIBInterstitial.showInterstitial(() => {});
  } else {
    callback();
  }
};

export const showAIBInterstitialAd = (navigation, percent, callback) => {
  const rd = Math.floor(Math.random() * 100) + 1;
  if (rd <= percent) {
    startActivityForResult(navigation, 'AIBInterstitialScreen', {}, () => callback());
  } else {
    callback();
  }
};
