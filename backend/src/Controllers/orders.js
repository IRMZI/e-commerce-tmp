import OrdersDataAccess from '../DataAccess/orders.js';
import { ok, serverError } from '../helpers/httpResponse.js';

export default class OrdersControllers {
    constructor() {
        this.dataAccess = new OrdersDataAccess(); // Instancia a classe de acesso aos dados de produtos
    }

    // Método para obter todos os produtos
    async getOrders() {
        try {
            const orders = await this.dataAccess.getOrders(); // Obtém todos os produtos
            return ok(orders); 
        } catch (error) {
            return serverError(error); 
        }
    }

    // Método para excluir um produto pelo ID
    async deleteOrder(orderId) {
        try {
            const result = await this.dataAccess.deleteOrder(orderId); // Exclui o produto pelo ID
            return ok(result); 
        } catch (error) {
            return serverError(error); 
        }
    }

    // Método para adicionar um novo produto
    async addOrders(orderData) {
        try {
            const result = await this.dataAccess.addOrder(orderData); // Adiciona um novo produto
            return ok(result); 
        } catch (error) {
            return serverError(error); 
        }
    }

    // Método para atualizar as informações de um produto pelo ID
    async updateOrder(orderId, orderData) {
        try {
            const result = await this.dataAccess.updateOrder(orderId, orderData); // Atualiza o produto pelo ID
            return ok(result); 
        } catch (error) {
            return serverError(error); 
        }
    }
}
