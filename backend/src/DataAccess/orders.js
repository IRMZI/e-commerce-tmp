import { ObjectId } from "mongodb";
import { Mongo } from "../database/mongo.js";

const collectionName = "orders";

export default class OrdersDataAccess {
  // Método para obter todos os pedidos
  async getOrders() {
    const result = await Mongo.db
      .collection(collectionName)
      .aggregate([
        {
          $lookup: {
            from: "orderItems",
            localField: "_id",
            foreignField: "orderId",
            as: "orderItems",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userDetails",
          },
        },
        {
          $project: {
            "userDetails.password": 0,
            "userDetails.salt": 0,
          },
        },
        {
          $unwind: "$orderItems",
        },
        {
          $lookup: {
            from: "products",
            localField: "orderItems.productId",
            foreignField: "_id",
            as: "orderItems.itemDetails",
          },
        },
        {
          $group: {
            _id: "$_id",
            userDetails: { $first: "$userDetails" },
            orderItems: { $push: "$orderItems" },
            pickupStatus: { $first: "$pickupStatus" },
            pickupTime: { $first: "$pickupTime" },
            deliveryDate: { $first: "$deliveryDate" } 
          },
        },
      ])
      .toArray();
    return result;
  }

  // Método para obter os pedidos de um usuário pelo ID
  async getOrdersByUserId(userId) {
    const result = await Mongo.db
      .collection(collectionName)
      .aggregate([
        {
          $match: { userId: new ObjectId(userId) },
        },
        {
          $lookup: {
            from: "orderItems",
            localField: "_id",
            foreignField: "orderId",
            as: "orderItems",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userDetails",
          },
        },
        {
          $project: {
            "userDetails.password": 0,
            "userDetails.salt": 0,
          },
        },
        {
          $unwind: "$orderItems",
        },
        {
          $lookup: {
            from: "products",
            localField: "orderItems.productId",
            foreignField: "_id",
            as: "orderItems.itemDetails",
          },
        },
        {
          $group: {
            _id: "$_id",
            userDetails: { $first: "$userDetails" },
            orderItems: { $push: "$orderItems" },
            pickupStatus: { $first: "$pickupStatus" },
            pickupTime: { $first: "$pickupTime" },
            createDate: { $first: "$createDate" },
            deliveryDate: { $first: "$deliveryDate" } 
          },
        },
      ])
      .toArray();
    return result;
  }

  // Método para adicionar um novo pedido
  async addOrder(orderData) {
    const { items, ...orderDataRest } = orderData;
    orderDataRest.createdAt = new Date();
    orderDataRest.pickupStatus = "pending";
    orderDataRest.userId = new ObjectId(orderDataRest.userId);

    const newOrder = await Mongo.db
      .collection(collectionName)
      .insertOne(orderDataRest);

    if (!newOrder.insertedId) {
      throw new Error("order cannot be inserted");
    }

    items.map((item) => {
      item.productId = new ObjectId(item.productId);
      item.orderId = new ObjectId(newOrder.insertedId);
    });
    const result = await Mongo.db.collection("orderItems").insertMany(items); // Insere o produto na coleção
    return result;
  }

  // Método para excluir um pedido pelo ID
  async deleteOrder(orderId) {
    const itemsToDelete = await Mongo.db
      .collection("orderItems")
      .deleteMany({ orderId: new ObjectId(orderId) });

    const orderToDelete = await Mongo.db
      .collection(collectionName)
      .findOneAndDelete({ _id: new ObjectId(orderId) });

    const result = {
      itemsToDelete,
      orderToDelete,
    };
    return result;
  }

  // Método para atualizar um pedido pelo ID
  async updateOrder(orderId, orderData) {
    const result = await Mongo.db.collection(collectionName).findOneAndUpdate(
      { _id: new ObjectId(orderId) },
      { $set: orderData } // Atualiza os dados do pedido com as novas informações
    );
    return result;
  }

  // Método para adicionar um item a um pedido
  async addItemToOrder(orderId, itemData) {
    itemData.productId = new ObjectId(itemData.productId);
    itemData.orderId = new ObjectId(orderId);

    const result = await Mongo.db.collection("orderItems").insertOne(itemData); // Adiciona o item à coleção de items
    return result;
  }

  async updateItemQuantity(orderId, itemId, quantity) {
    const result = await Mongo.db
      .collection("orderItems")
      .findOneAndUpdate(
        { orderId: new ObjectId(orderId), _id: new ObjectId(itemId) },
        { $set: { quantity: quantity } }, // Atualiza a quantidade do item no pedido
        { returnDocument: "after" } // Retorna o documento atualizado
      );
  
    return result.value; // Retorna o documento atualizado
  }
  
  // Método para remover um item de um pedido
  async removeItemFromOrder(orderId, itemId) {
    const result = await Mongo.db
      .collection("orderItems")
      .deleteOne({ orderId: new ObjectId(orderId), _id: new ObjectId(itemId) }); // Remove o item da coleção
    return result;
  }
}
