import { TRPCError } from '@trpc/server';
import bcrypt from 'bcryptjs';
import { CookieOptions } from 'express';

import { Context } from '..';
import serverConfig from '../config/default';
import User from '../models/user';
import { CreateUserInput, LoginUserInput } from '../schema/user.schema';
import { createUser, findUser, signTokens } from '../services/users.service';
import redisClient from '../util/connectRedis';
import { signJwt, verifyJwt } from '../util/jwt';

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
};

const accessTokenCookieOptions: CookieOptions = {
  ...cookieOptions,
  expires: new Date(Date.now() + serverConfig.accessTokenExpiresIn * 60 * 1000),
};

const refreshTokenCookieOptions: CookieOptions = {
  ...cookieOptions,
  expires: new Date(
    Date.now() + serverConfig.refreshTokenExpiresIn * 60 * 1000,
  ),
};

export const registerHandler = async ({
  input,
}: {
  input: CreateUserInput;
}): Promise<{ status: string, data: any }> => {
  try {
    const hashedPassword = await bcrypt.hash(input.password, 12);
    const user = await createUser({
      email: input.email.toLowerCase(),
      name: input.name,
      password: hashedPassword,
      provider: 'local',
    });
    return {
      status: 'success',
      data: { user },
    };
  } catch (error) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Email already exists',
    });
  }
};

export const loginHandler = async ({
  input,
  ctx,
}: {
  input: LoginUserInput;
  ctx: Context;
}): Promise<{ status: string, access_token: string }> => {
  try {
    // Get the user from the collection
    const user = await findUser(input.email.toLowerCase()) as User;

    // Check if user exist and password is correct
    if (!user || !(await bcrypt.compare(input.password, user.password))) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Invalid email or password',
      });
    }

    // Create the Access and refresh Tokens
    const { access_token, refresh_token } = await signTokens(user);

    // Send Access Token in Cookie
    ctx.res.cookie('access_token', access_token, accessTokenCookieOptions);
    ctx.res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
    ctx.res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    // Send Access Token
    return {
      status: 'success',
      access_token,
    };
  } catch (error: any) {
    throw error;
  }
};

export const refreshAccessTokenHandler = async ({ ctx }: { ctx: Context })
: Promise<{ status: string, access_token: string }> => {
  try {
    // Get the refresh token from cookie
    const refresh_token = ctx.req.cookies?.refresh_token as string;

    const message = 'Could not refresh access token';
    if (!refresh_token) {
      throw new TRPCError({ code: 'FORBIDDEN', message });
    }

    // Validate the Refresh token
    const decoded = verifyJwt<{ sub: string }>(
      refresh_token,
      'refreshTokenPublicKey',
    );

    if (!decoded) {
      throw new TRPCError({ code: 'FORBIDDEN', message });
    }

    // Check if the user has a valid session
    const session = await redisClient.get(decoded.sub);
    if (!session) {
      throw new TRPCError({ code: 'FORBIDDEN', message });
    }

    // Check if the user exist
    const user = await findUser(JSON.parse(session)._id);

    console.log(JSON.parse(session));

    if (!user) {
      throw new TRPCError({ code: 'FORBIDDEN', message });
    }

    // Sign new access token
    const access_token = signJwt({ sub: user._id }, 'accessTokenPrivateKey', {
      expiresIn: `${serverConfig.accessTokenExpiresIn}m`,
    });

    // Send the access token as cookie
    ctx.res.cookie('access_token', access_token, accessTokenCookieOptions);
    ctx.res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    // Send response
    return {
      status: 'success',
      access_token,
    };
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};

const logout = ({ ctx }: { ctx: Context }): void => {
  ctx.res.cookie('access_token', '', { maxAge: -1 });
  ctx.res.cookie('refresh_token', '', { maxAge: -1 });
  ctx.res.cookie('logged_in', '', {
    maxAge: -1,
  });
};

export const logoutHandler = async ({ ctx }: { ctx: Context }): Promise<{ status: string }> => {
  try {
    const { user } = ctx;
    if (!user) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'User not found',
      });
    }
    await redisClient.del(user._id);
    logout({ ctx });
    return { status: 'success' };
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};
