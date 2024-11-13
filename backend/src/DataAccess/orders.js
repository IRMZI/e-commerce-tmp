import { ObjectId } from "mongodb";
import { Mongo } from "../database/mongo.js";

const collectionName = 'orders';

export default class OrdersDataAccess {
    // Método para obter todos os produtos
    async getOrders() {
        const result = await Mongo.db
            .collection(collectionName)
            .aggregate([{
                $lookup: {
                    from: 'ordersItems',
                    localField: '_id',
                    foreignField: '_orderId',
                    as: 'orderItems',
                }
            }
            ])
            .toArray();
        return result;
    }
    
    // Método para adicionar um novo produto
    async addOrder(orderData) {
        const { items, ...orderDataRest } = orderData
        orderDataRest.createdAt = new Date()
        orderDataRest.pickupStatus = "pending"
        orderDataRest.userId = new ObjectId(orderDataRest.userId)
        const newOrder = await Mongo.db
        .collection(collectionName)
        .insertOne(orderDataRest)
        if(!newOrder.insertedId) {
            throw new Error('order cannot be inserted')
        }

        // permite utilizar cada item do objeto, tratando os itens do pedido
        items.map((item) =>{
            item.productId = new ObjectId(orderDataRest.productId)
            item.orderId = new ObjectId(newOrder.insertedId)
        })
        const result = await Mongo.db
            .collection('orderItems')
            .insertMany(items); // Insere o produto na coleção
        return result;
    }
       
    // Método para excluir um produto pelo ID
    async deleteOrder(orderId) {
        const result = await Mongo.db
            .collection(collectionName)
            .findOneAndDelete({ _id: new ObjectId(orderId) }); // Exclui o produto pelo ID
        return result;
    }

    // Método para atualizar um produto pelo ID
    async updateOrder(orderId, orderData) {
        const result = await Mongo.db
            .collection(collectionName)
            .findOneAndUpdate(
                { _id: new ObjectId(orderId) },
                { $set: orderData } // Atualiza os dados do produto com as novas informações
            );
        return result;
    }
}
