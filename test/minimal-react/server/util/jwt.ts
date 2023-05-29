import jwt, { SignOptions } from 'jsonwebtoken';
import serverConfig from '../config/default';

export const signJwt = (
  payload: Object,
  key: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options: SignOptions = {}
) => {
  console.log(payload);
  const privateKey = Buffer.from(serverConfig[key], 'base64').toString('ascii');


  return jwt.sign(payload, privateKey, {
    ...(options && options),
    allowInsecureKeySizes: true,
    algorithm: 'RS256',
  });
};

export const verifyJwt = <T>(
    token: string,
    key: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
  ): T | null => {
    try {
      const publicKey = Buffer.from(serverConfig[key], 'base64').toString(
        'ascii'
      );
      return jwt.verify(token, publicKey) as T;
    } catch (error) {
      return null;
    }
  };