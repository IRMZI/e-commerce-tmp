import productsDataAccess from "../DataAccess/products.js";
import { ok, serverError } from '../helpers/httpResponse.js';

export default class ProductsControllers {
    constructor() {
        this.dataAccess = new productsDataAccess(); // Instancia a classe de acesso aos dados de produtos
    }

    // Método para obter todos os produtos
    async getProducts() {
        try {
            const products = await this.dataAccess.getProducts(); // Obtém todos os produtos
            return ok(products); 
        } catch (error) {
            return serverError(error); 
        }
    }

    // Método para obter todos os produtos disponíveis
    async getAvailableProducts() {
        try {
            const products = await this.dataAccess.getAvailableProducts(); // Obtém produtos disponíveis
            return ok(products); 
        } catch (error) {
            return serverError(error); 
        }
    }

    // Método para excluir um produto pelo ID
    async deleteProduct(productId) {
        try {
            const result = await this.dataAccess.deleteProduct(productId); // Exclui o produto pelo ID
            return ok(result); 
        } catch (error) {
            return serverError(error); 
        }
    }

    // Método para adicionar um novo produto
    async addProducts(productData) {
        try {
            const result = await this.dataAccess.addProduct(productData); // Adiciona um novo produto
            return ok(result); 
        } catch (error) {
            return serverError(error); 
        }
    }

    // Método para atualizar as informações de um produto pelo ID
    async updateProduct(productId, productData) {
        try {
            const result = await this.dataAccess.updateProduct(productId, productData); // Atualiza o produto pelo ID
            return ok(result); 
        } catch (error) {
            return serverError(error); 
        }
    }
}
