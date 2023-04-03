import { TRPCError } from '@trpc/server';
import bcrypt from 'bcryptjs';
import { CreateUserInput, LoginUserInput } from '../schema/user.schema';
import { createUser, findUser, signTokens } from '../services/users.service';

export const registerHandler = async ({
    input,
  }: {
    input: CreateUserInput;
  }) => {
    try {
        console.log(input);
      const hashedPassword = await bcrypt.hash(input.password, 12);
      const user = await createUser({
        email: input.email.toLowerCase(),
        name: input.name,
        password: hashedPassword,
        provider: 'local',
      });
  
      return {
        status: 'success',
        data: {
          user,
        },
      };
    } catch (err: any) {
      // EMAIL ALREADY EXISTS
      throw err;
    }
  };

  /*export const loginHandler = async ({
    input,
    ctx,
  }: {
    input: LoginUserInput;
    ctx: Context;
  }) => {
    try {
      // Get the user from the collection
      const user = await findUser(input.email.toLowerCase());
  
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
    } catch (err: any) {
      throw err;
    }
  };*/