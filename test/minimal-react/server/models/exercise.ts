import { ObjectId } from "mongodb";

export default class Exercise {
    constructor(
        public excerise: string,
        public category: string,
        public description: string,
        public id?: ObjectId
    ){
    }
}