

import { ObjectId } from "mongodb";

export default class User {
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public createdAt?: Date,
        public updatedAt?: Date,
        public provider?: string,
        public role?: RoleEnumType,
        public id?: ObjectId
    ){
    }
}

export enum RoleEnumType {
    ADMIN = "admin",
    USER = "user"
}