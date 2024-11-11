import usersDataAccess from "../DataAccess/users.js";
import { ok, serverError } from '../helpers/httpResponse.js'

export default class UsersControllers {
    constructor() {
        this.dataAccess = new usersDataAccess(); // Instancia a classe de acesso aos dados
    }

    // Método para obter todos os usuários
    async getUsers() {
        try {
            const users = await this.dataAccess.getUsers(); // Obtém os usuários
            return ok(users); 
        } catch (error) {
            return serverError(error); 
        }
    }

    // Método para excluir um usuário
    async deleteUser(userId) {
        try {
            const result = await this.dataAccess.deleteUser(userId); // Exclui o usuário pelo ID
            return ok(result); 
        } catch (error) {
            return serverError(error); 
        }
    }

    // Método para atualizar as informações de um usuário
    async updateUser(userId, userData) {
        try {
            const result = await this.dataAccess.updateUser(userId, userData); // Atualiza os dados
            return ok(result); 
        } catch (error) {
            return serverError(error); 
        }
    }
}