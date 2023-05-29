import { ObjectId } from "mongodb";

interface Exercise {
    exercise: string;
    sets: number;
    training: {
        weight: number;
        reps: number;
    }[];
}

export default class Workout {
    constructor(
        public exercises: Exercise[],
        public startDate: string,
        public endDate: string,
        public email?: string,
        public note?: string,
        public _id?: ObjectId
    ){
    }
}