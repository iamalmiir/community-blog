import * as CryptoJS from 'crypto-js';

export const encrypt = (value: string) => {
  const encrypted = CryptoJS.AES.encrypt(value, process.env.ENC_KEY);
  return encrypted.toString();
};

export const decrypt = (value: any) => {
  const bytes = CryptoJS.AES.decrypt(value, process.env.ENC_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
