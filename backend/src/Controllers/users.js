import usersDataAccess from "../DataAcess/users.js";
import { ok, serverError } from '../helpers/httpResponse.js'

export default class UsersControllers {
    constructor(){
        this.dataAccess = new usersDataAccess()
        
    }
    async getUsers() {
        try {
            const users = this.dataAccess.getUsers()
            return ok(users)
        } catch (error) {
            return serverError(error)
        }
    }
}