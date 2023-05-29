import { array, date, number, object, string, TypeOf } from 'zod';

export const createWorkoutSchema = object({
  note: string().optional(),
  startDate: string({required_error: 'Start date is required'}),
  endDate: string({required_error: 'End date is required'}),
  exercises: array(object({
    sets:  number({required_error: 'Sets is required'}),
    training: array(object({
      weight: number({required_error: 'Weight is required'}),
      reps:  number({required_error: 'Reps is required'}),
    })),
    exercise: string({required_error: 'Exercise is required'}),
  })),
});

export type CreateWorkoutInput = TypeOf<typeof createWorkoutSchema>;