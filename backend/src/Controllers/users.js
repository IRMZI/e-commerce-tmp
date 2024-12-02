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
     // Método para atualizar o endereço de um usuário
     async updateUserAddress(userId, addressData) {
        try {
            // Validação do endereço (você pode personalizar conforme necessário)
            if (!addressData || !addressData.street || !addressData.city || !addressData.number) {
                return { success: false, statusCode: 400, body: { error: 'Endereço inválido, endereço obtido:', addressData} };
            }

            // Atualiza apenas o endereço do usuário
            const result = await this.dataAccess.updateUserAddress(userId, addressData);
            if (!result) {
                return { success: false, statusCode: 404, body: { error: 'Usuário não encontrado.' } };
            }

            return { success: true, statusCode: 200, body: { message: 'Endereço atualizado com sucesso.' } };
        } catch (error) {
            return { success: false, statusCode: 500, body: { error: error.message } };
        }
    }
}
