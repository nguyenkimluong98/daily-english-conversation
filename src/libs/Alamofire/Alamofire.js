import axios from 'axios';
import Config from '../../config/env';

const get = (url, headers = {}) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers
    }
  })
    .then(res => res.json())
    .catch(err => {
      console.log(err);
      return err;
    });
};
/**
 *
 *
 * @param {any} url
 * @param {string} [method='GET']
 * @param {any} body
 * @param {any} [headers={}]
 * @returns
 */
export const request = (url, method = 'GET', body, headers = {}) => {
  if (!Config.release) {
    console.log('URL: ' + url);
    console.log('METHOD: ' + method);
    console.log('BODY: ' + JSON.stringify(body));
    console.log('Headers: ' + JSON.stringify(headers));
  }

  if (method == 'GET') {
    return get(url, headers);
  }

  return axios({
    method,
    url,
    data: body,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers
    },
    withCredentials: true
  })
    .then(res => res.data)
    .catch(err => {
      console.log(err);
      return err;
    });
};
