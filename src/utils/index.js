import { Dimensions, Platform, StatusBar, NativeModules } from 'react-native';
import * as StoreReview from 'react-native-store-review';
import Permissions from 'react-native-permissions';
export * from './intent';
export * from './time';

export const AIBModule = NativeModules.AIBModule;

export function isIphoneX() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 || dimen.width === 812 || (dimen.height === 896 || dimen.width === 896))
  );
}

export function ifIphoneX(iphoneXStyle, regularStyle) {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
}

export function getStatusBarHeight(safe) {
  return Platform.select({
    ios: ifIphoneX(safe ? 44 : 30, 20),
    android: StatusBar.currentHeight
  });
}

export function getBottomSpace() {
  return isIphoneX() ? 34 : 0;
}

export function rateApp() {
  return Platform.select({
    ios: () => {
      if (StoreReview.isAvailable) {
        StoreReview.requestReview();
      }
    },
    android: () => {
      AIBModule.rateApp();
    }
  })();
}

export function showProgressDialog(message) {
  AIBModule.showProgressDialog(message);
}

export function hideProgressDialog() {
  AIBModule.hideProgressDialog();
}

export function showExitNativeAd() {
  AIBModule.showExitNativeAd();
}
// Permission
export const requestPermission = (key, callback) => {
  Permissions.request(key).then(response => {
    checkPermission(response, callback, key);
  });
};
const checkPermission = (response, callback, key) => {
  if (response == 'authorized' || response == 'allow') {
    callback();
  } else {
    requestPermission(key, callback);
  }
};
