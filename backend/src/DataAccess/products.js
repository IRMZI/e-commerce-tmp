import { ObjectId } from "mongodb";
import { Mongo } from "../database/mongo.js";

const collectionName = 'products';

export default class productsDataAccess {
    // Método para obter todos os produtos
    async getProducts() {
        const result = await Mongo.db
            .collection(collectionName)
            .find({})
            .toArray();
        return result;
    }

    // Método para obter apenas os produtos disponíveis
    async getAvailableProducts() {
        const result = await Mongo.db
            .collection(collectionName)
            .find({ available: true })
            .toArray();
        return result;
    }
    
    // Método para adicionar um novo produto
    async addProduct(productData) {
        const result = await Mongo.db
            .collection(collectionName)
            .insertOne(productData); // Insere o produto na coleção
        return result;
    }
       
    // Método para excluir um produto pelo ID
    async deleteProduct(productId) {
        const result = await Mongo.db
            .collection(collectionName)
            .findOneAndDelete({ _id: new ObjectId(productId) }); // Exclui o produto pelo ID
        return result;
    }

    // Método para atualizar um produto pelo ID
    async updateProduct(productId, productData) {
        const result = await Mongo.db
            .collection(collectionName)
            .findOneAndUpdate(
                { _id: new ObjectId(productId) },
                { $set: productData } // Atualiza os dados do produto com as novas informações
            );
        return result;
    }
}
