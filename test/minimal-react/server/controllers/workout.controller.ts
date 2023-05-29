import { TRPCError } from "@trpc/server";
import { Context } from "..";
import { CreateWorkoutInput } from "../schema/workout.schema";
import { createWorkout, selectWorkouts } from "../services/workout.service";

export const getWorkoutsHandler = async ({ ctx }: { ctx: Context }) => {
    try {
      const user = ctx.user;
      if (!user) return;
      const { email } = user;
      const workouts = await selectWorkouts(email);
      return {
        status: 'success',
        data: {
          workouts,
        },
      };
    } catch (err: any) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: err.message,
      });
    }
  };

export const createWorkoutHandler = ({ ctx, input }: { ctx: Context, input: CreateWorkoutInput }) => {
    try {
      const user = ctx.user;
      if (!user) return;
      const { email } = user;
      const workouts = createWorkout({...input, email})
      return {
        status: 'success',
        data: {
          workouts,
        },
      };
    } catch (err: any) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: err.message,
      });
    }
}