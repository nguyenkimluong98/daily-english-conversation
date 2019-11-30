import Alamofire from '../Alamofire';
import Crypto from '../Crypto';
import { unixTime } from '../../utils';

const getInfo = (videoId, appId, handler) => {
  const path = '/youtube?id=' + videoId + '&app=' + appId + '&time=' + unixTime();
  const hash = Crypto.sha256(path, 'XM0IF8f1GMzPJwbxpO3e');
  const url = 'http://gcs-video.babylover.me' + path;
  Alamofire.request(
    url,
    'GET',
    {},
    {
      Authorization: 'Bearer ' + hash
    }
  )
    .then(response => handler(response))
    .catch(err => handler({ code: 4, err }));
};

export default {
  getInfo
};
