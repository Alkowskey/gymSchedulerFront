import { inferAsyncReturnType, initTRPC, TRPCError } from '@trpc/server';
import { CreateExpressContextOptions, createExpressMiddleware } from '@trpc/server/adapters/express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import serverConfig from './config/default';
import {
  loginHandler, logoutHandler, registerHandler,
} from './controllers/auth.controller';
import { getMeHandler } from './controllers/user.controller';
import { createWorkoutHandler, getWorkoutsHandler } from './controllers/workout.controller';
import { deserializeUser } from './middleware/deserializeUser';
import { createUserSchema, emptyQuerySchema, loginUserSchema } from './schema/user.schema';
import { createWorkoutSchema } from './schema/workout.schema';
import { collections, connectToDatabase } from './services/database.service';
import { selectExercises } from './services/exercises.service';

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
  //refreshToken: t.procedure.query(({ ctx }) => refreshAccessTokenHandler({ ctx })),
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
  getMe: isAuthorizedProcedure.input(emptyQuerySchema).query(({ ctx }) => getMeHandler({ ctx })),
  getExercises: isAuthorizedProcedure.input(emptyQuerySchema).query(async () => {
    const exercises = await selectExercises();
    if (!exercises?.length) throw new Error('Exercise not found');
    return exercises;
  })
});

const workoutRouter = t.router({
  getWorkouts: isAuthorizedProcedure.input(emptyQuerySchema).query(async ({ctx}) => {
    const resp = getWorkoutsHandler({ctx});
    return resp;
  }),
  createWorkout: isAuthorizedProcedure.input(createWorkoutSchema).mutation(async ({ctx, input}) => {
    const resp = createWorkoutHandler({ctx, input});
    return resp;
  })
});

const appRouter = t.mergeRouters(authRouter, userRouter, workoutRouter);

export type AppRouter = typeof appRouter;

const app = express();
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

app.use(cookieParser());
app.use(
  cors({
    origin: [serverConfig.origin, 'http://localhost:3000'],
    credentials: true,
  }),
);

app.use(
  '/api/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

const { port } = serverConfig;
app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);

  // CONNECT DB
  connectToDatabase();
});
