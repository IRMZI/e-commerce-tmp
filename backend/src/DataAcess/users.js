import { ObjectId } from "mongodb";
import { Mongo } from "../database/mongo.js";
import crypto from 'crypto'


const collectionName = 'users'

export default class usersDataAccess {
    async getUsers() {
     const result = await Mongo.db
     .collection(collectionName)
     .find({})
     .toArray()
    }
    async deleteUser() {

    }
    async updateUser() {
        
    }
}