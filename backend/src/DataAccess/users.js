import { ObjectId } from "mongodb";
import { Mongo } from "../database/mongo.js";
import crypto from 'crypto';

const collectionName = 'users';

export default class usersDataAccess {
    // Método para obter todos os usuários
    async getUsers() {
        const result = await Mongo.db
            .collection(collectionName)
            .find({})
            .toArray();
        return result;
    }

    // Método para obter um usuário pelo ID
    async getUserById(userId) {
        const result = await Mongo.db
            .collection(collectionName)
            .findOne({ _id: new ObjectId(userId) });
        return result;
    }

    // Método para excluir um usuário pelo ID
    async deleteUser(userId) {
        const result = await Mongo.db
            .collection(collectionName)
            .findOneAndDelete({ _id: new ObjectId(userId) });
        return result;
    }

    // Método para atualizar um usuário pelo ID
    async updateUser(userId, userData) {
        if (userData.password) {
            // Gera um salt aleatório para proteger a nova senha do usuário
            const salt = crypto.randomBytes(16);

            // Gera o hash da senha com o salt criado
            crypto.pbkdf2(userData.password, salt, 310000, 16, 'sha256', async (error, hashedPassword) => {
                if (error) {
                    throw new Error("Erro ao gerar hash da senha");
                }
                // Atualiza os dados do usuário com a senha criptografada e o salt
                userData = { ...userData, password: hashedPassword, salt };

                const result = await Mongo.db.collection(collectionName).findOneAndUpdate(
                    { _id: new ObjectId(userId) },
                    { $set: userData }
                );
                return result;
            });
        } else {
            // Atualiza os dados do usuário sem alterar a senha
            const result = await Mongo.db.collection(collectionName).findOneAndUpdate(
                { _id: new ObjectId(userId) },
                { $set: userData }
            );
            return result;
        }
    }

    // Método para verificar se um email já existe
    async checkEmailExists(email) {
        const result = await Mongo.db
            .collection(collectionName)
            .findOne({ email: email });
        return result !== null;
    }

    // Método para atualizar o endereço de um usuário
    async updateUserAddress(userId, addressData) {
    try {
        // Validação do endereço (pode ser personalizada conforme necessário)
        if (!addressData || !addressData.street || !addressData.city || !addressData.number) {
            return { success: false, statusCode: 400, body: { error: 'Endereço inválido.' } };
        }

        // Tenta atualizar o endereço do usuário
        const result = await Mongo.db.collection(collectionName).findOneAndUpdate(
            { _id: new ObjectId(userId) }, // Filtro para encontrar o usuário
            { $set: { address: addressData } }, // Atualiza apenas o campo de endereço
            { returnDocument: 'after' } // Retorna o documento atualizado
        );

        // Se o usuário não for encontrado, retorna erro 404
        if (!result.value) {
            return { success: false, statusCode: 404, body: { error: 'Usuário não encontrado.' } };
        }

        // Retorna o sucesso com o documento atualizado
        return { success: true, statusCode: 200, body: { message: 'Endereço atualizado com sucesso.', data: result.value } };
    } catch (error) {
        // Retorna erro em caso de falha
        return { success: false, statusCode: 500, body: { error: error.message } };
    }
}
}
