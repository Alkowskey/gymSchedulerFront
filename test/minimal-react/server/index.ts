import { createHTTPServer } from '@trpc/server/adapters/standalone';
import cors from 'cors';
import { mainRouter } from './router/router';
import { connectToDatabase } from './services/database.service';

const createContext = ({ req, res }: CreateExpressContextOptions) => deserializeUser({ req, res });

export type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create();

const authRouter = t.router({
  registerUser: t.procedure
    .input(createUserSchema)
    .mutation(({ input }) => registerHandler({ input })),
  loginUser: t.procedure
    .input(loginUserSchema)
    .mutation(({ input, ctx }) => loginHandler({ input, ctx })),
  logoutUser: t.procedure.mutation(({ ctx }) => logoutHandler({ ctx })),
  refreshToken: t.procedure.query(({ ctx }) => refreshAccessTokenHandler({ ctx })),
});

const isAuthorized = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to access this resource',
    });
  }
  return next();
});

const isAuthorizedProcedure = t.procedure.use(isAuthorized);

const userRouter = t.router({
  sayHello: t.procedure.query(async () => {
    const message = await redisClient.get('tRPC');
    return { message };
  }),
  getMe: isAuthorizedProcedure.query(({ ctx }) => getMeHandler({ ctx })),
});

