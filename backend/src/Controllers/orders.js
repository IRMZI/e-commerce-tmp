import OrdersDataAccess from '../DataAccess/orders.js';
import { ok, serverError } from '../helpers/httpResponse.js';

export default class OrdersControllers {
    constructor() {
        this.dataAccess = new OrdersDataAccess(); // Instancia a classe de acesso aos dados de pedidos
    }

    // Método para obter todos os pedidos
    async getOrders() {
        try {
            const orders = await this.dataAccess.getOrders(); // Obtém todos os pedidos
            return ok(orders); 
        } catch (error) {
            return serverError(error); 
        }
    }
    // Método para obter todos os pedidos
    async getOrdersByUserId(userId) {
        try {
            const orders = await this.dataAccess.getOrdersByUserId(userId); // Obtém todos os pedidos
            return ok(orders); 
        } catch (error) {
            return serverError(error); 
        }
    }

    // Método para excluir um pedido pelo ID
    async deleteOrder(orderId) {
        try {
            const result = await this.dataAccess.deleteOrder(orderId); // Exclui o pedido pelo ID
            return ok(result); 
        } catch (error) {
            return serverError(error); 
        }
    }

    // Método para adicionar um novo pedido
    async addOrders(orderData) {
        try {
            const result = await this.dataAccess.addOrder(orderData); // Adiciona um novo pedido
            return ok(result); 
        } catch (error) {
            return serverError(error); 
        }
    }

    // Método para atualizar as informações de um pedido pelo ID
    async updateOrder(orderId, orderData) {
        try {
            const result = await this.dataAccess.updateOrder(orderId, orderData); // Atualiza o pedido pelo ID
            return ok(result); 
        } catch (error) {
            return serverError(error); 
        }
    }
}
