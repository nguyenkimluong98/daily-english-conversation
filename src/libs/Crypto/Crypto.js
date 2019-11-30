import Crypto from 'crypto-js';

export const sha256 = (clearText, secretKey) => {
  return Crypto.HmacSHA256(clearText, secretKey).toString();
};
