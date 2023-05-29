import Exercise from "../models/exercise";
import { collections } from "./database.service";

export const createExercise = async (input: Exercise) => {
    return await collections.exercises?.insertOne(input);
};

export const findExercise = async (
    input: string
) => {
    return await collections.exercises?.findOne({ email: input });
};

export const selectExercises = async () => {
    return await collections.exercises?.find({}).toArray() as Exercise[];
}