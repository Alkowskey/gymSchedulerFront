// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables
export const collections: { exercises?: mongoDB.Collection, users?: mongoDB.Collection } = {}

// Initialize Connection

export async function connectToDatabase () {
    dotenv.config();

    if(!process.env.DB_CONN_STRING) throw new Error("DB_CONN_STRING not found in .env file");
    if(!process.env.DB_NAME) throw new Error("DB_NAME not found in .env file");
    if(!process.env.DB_COLLECTION_NAME) throw new Error("DB_COLLECTION_NAME not found in .env file");

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
            
    await client.connect();
        
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
   
    const exerciseCollection: mongoDB.Collection = db.collection(process.env.DB_COLLECTION_NAME);
    const userCollection: mongoDB.Collection = db.collection("users");
 
    collections.exercises = exerciseCollection;
    collections.users = userCollection;
       
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${exerciseCollection.collectionName}`);
 }