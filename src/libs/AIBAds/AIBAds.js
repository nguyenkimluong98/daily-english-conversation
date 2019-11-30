import { AsyncStorage } from 'react-native';
import Alamofire from '../Alamofire';
import Crypto from '../Crypto';
import { unixTime } from '../../utils';
import APIConfig from './env';

export const loadAds = (app_id, handler) => {
  const path = 'app_id=' + app_id + '&time=' + unixTime();
  const hash = Crypto.sha256(path, APIConfig.secret);
  const url = APIConfig.host + APIConfig.path.ad_config + '?' + path + '&token=' + hash;

  Alamofire.request(url, 'GET')
    .then(response => {
      const code = response.code;
      if (code == 3 && response.data) {
        setupAds(response, handler);
      } else {
        setupAds(null, handler);
      }
    })
    .catch(err => {
      setupAds(null, handler);
    });
};

const setupAds = (response, handler) => {
  if (response && response.data) {
    AsyncStorage.setItem('ads', JSON.stringify(response.data))
      .then(() => handler(true))
      .catch(() => handler(false));
  } else {
    AsyncStorage.removeItem('ads')
      .then(() => handler(false))
      .catch(() => handler(false));
  }
};
