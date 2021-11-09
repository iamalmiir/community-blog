import * as CryptoJS from 'crypto-js';
import * as jwt from 'jsonwebtoken';

export const encrypt = async (payload: any) => {
  const token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1d',
    algorithm: 'HS512',
    header: {
      typ: 'JWT',
      alg: 'HS512',
    },
  });
  const encrypted = await CryptoJS.AES.encrypt(token, process.env.ENC_KEY);
  return encrypted.toString();
};

export const decrypt = (payload: any) => {
  const bytes = CryptoJS.AES.decrypt(payload, process.env.ENC_KEY);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  const token = jwt.verify(decrypted, process.env.JWT_SECRET);
  return token;
};
