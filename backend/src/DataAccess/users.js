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
}
