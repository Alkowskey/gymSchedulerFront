import { TRPCError } from '@trpc/server';

import { Request, Response } from 'express';
import { findUser } from '../services/users.service';
import redisClient from '../util/connectRedis';
import { verifyJwt } from '../util/jwt';

export const deserializeUser = async ({
  req,
  res,
}: {
  req: Request;
  res: Response;
}) => {
  try {
    // Get the token
    let access_token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      access_token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.access_token) {
      access_token = req.cookies.access_token;
    }

    const notAuthenticated = {
      req,
      res,
      user: null,
    };

    if (!access_token) {
      return notAuthenticated;
    }

    // Validate Access Token
    const decoded = verifyJwt<{ sub: string }>(
      access_token,
      'accessTokenPublicKey'
    );

    if (!decoded || !decoded.sub) { // for some reason this check used to be just !decoded
      return notAuthenticated;
    }

    // Check if user has a valid session
    const session = await redisClient.get(decoded.sub);

    if (!session) {
      return notAuthenticated;
    }

    // Check if user still exist
    const user = await findUser( JSON.parse(session).name);

    if (!user) {
      return notAuthenticated;
    }

    return {
      req,
      res,
      user,
    };
  } catch (err: any) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: err.message,
    });
  }
};