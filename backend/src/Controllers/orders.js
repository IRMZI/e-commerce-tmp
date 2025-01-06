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

    // Método para obter pedidos de um usuário pelo ID
    async getOrdersByUserId(userId) {
        try {
            const orders = await this.dataAccess.getOrdersByUserId(userId); // Obtém todos os pedidos do usuário
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

    // Método para adicionar um item a um pedido
    async addItemToOrder(orderId, itemData) {
        try {
            const result = await this.dataAccess.addItemToOrder(orderId, itemData); // Adiciona o item ao pedido
            return ok(result);
        } catch (error) {
            return serverError(error);
        }
    }

    // Método para atualizar a quantidade de um item em um pedido
    async updateItemQuantity(orderId, itemId, quantity) {
        try {
            const result = await this.dataAccess.updateItemQuantity(orderId, itemId, quantity); // Atualiza a quantidade do item
            return ok(result);
        } catch (error) {
            console.error('Erro ao atualizar a quantidade do item:', error); // Log erro
            return serverError(error);
        }
    }

    // Método para remover um item de um pedido
    async removeItemFromOrder(orderId, itemId) {
        try {
            const result = await this.dataAccess.removeItemFromOrder(orderId, itemId); // Remove o item do pedido
            return ok(result);
        } catch (error) {
            return serverError(error);
        }
    }
}
