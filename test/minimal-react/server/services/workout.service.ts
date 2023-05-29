import Workout from "../models/workout";
import { collections } from "./database.service";

export const createWorkout = async (input: Workout) => {
    return await collections.workouts?.insertOne(input);
};

export const findWorkout = async (
    input: string
) => {
    return await collections.workouts?.findOne({ email: input });
};

export const selectWorkouts = async (email: string) => {
    return await collections.workouts?.find({ email }).toArray() as Workout[];
}