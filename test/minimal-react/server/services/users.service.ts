import serverConfig from "../config/default";
import User from "../models/user";
import { signJwt } from "../util/jwt";
import { collections } from "./database.service";


export const createUser = async (input: User) => {
    return await collections.users?.insertOne(input);
};

export const findUser = async (
    input: string
) => {
    return await collections.users?.findOne({ email: input });
};

export const updateUser = async (
    email: string,
    data: User
) => {
    return await collections.users?.updateOne(({ email: email }), { $set: data });
};

export const signTokens = async (user: any) => { // TODO - fix that type casting
  // 1. Create Session
  // redisClient.set(`${user.id}`, JSON.stringify(user), {
    // EX: serverConfig.redisCacheExpiresIn * 60,
  // });

  // 2. Create Access and Refresh tokens
  const access_token = signJwt({ sub: user.id }, 'accessTokenPrivateKey', {
    expiresIn: `${serverConfig.accessTokenExpiresIn}m`,
  });

  const refresh_token = signJwt({ sub: user.id }, 'refreshTokenPrivateKey', {
    expiresIn: `${serverConfig.refreshTokenExpiresIn}m`,
  });

  return { access_token, refresh_token };
};