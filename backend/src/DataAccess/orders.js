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
          // filtra a tabela de itens do pedido
          $lookup: {
            from: "orderItems",
            localField: "_id",
            foreignField: "orderId",
            as: "orderItems",
          },
        },
        {
          //filtra a tabela de usuários
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userDetails",
          },
        },
        {
          // escode informações
          $project: {
            "userDetails.password": 0,
            "userDetails.salt": 0,
          },
        },
        {
          // direciona pra tabela itens do pedido
          $unwind: "$orderItems",
        },
        {
          //filtra a tabela de produtos
          $lookup: {
            from: "products",
            localField: "orderItems.productId",
            foreignField: "_id",
            as: "orderItems.itemDetails",
          },
        },
        {
          // Engloba pelos orderItems
          $group: {
            _id: "$_id",
            userDetails: { $first: "$userDetails" },
            orderItems: { $push: "$orderItems" },
            pickupStatus: { $first: "$pickupStatus" },
            pickupTime: { $first: "$pickupTime" },
          },
        },
      ])
      .toArray();
    return result;
  }

  async getOrdersByUserId(userId) {
    const result = await Mongo.db
      .collection(collectionName)
      .aggregate([
        {
          $match: { userId: new ObjectId(userId) },
        },
        {
          // filtra a tabela de itens do pedido
          $lookup: {
            from: "orderItems",
            localField: "_id",
            foreignField: "orderId",
            as: "orderItems",
          },
        },
        {
          //filtra a tabela de usuários
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userDetails",
          },
        },
        {
          // escode informações
          $project: {
            "userDetails.password": 0,
            "userDetails.salt": 0,
          },
        },
        {
          // direciona pra tabela itens do pedido
          $unwind: "$orderItems",
        },
        {
          //filtra a tabela de produtos
          $lookup: {
            from: "products",
            localField: "orderItems.productId",
            foreignField: "_id",
            as: "orderItems.itemDetails",
          },
        },
        {
          // Engloba pelos orderItems
          $group: {
            _id: "$_id",
            userDetails: { $first: "$userDetails" },
            orderItems: { $push: "$orderItems" },
            pickupStatus: { $first: "$pickupStatus" },
            pickupTime: { $first: "$pickupTime" },
            createDate: { $first: "$createDate" },
          },
        },
      ])
      .toArray();
    return result;
  }

  // Método para adicionar um novo pedidos
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

    // permite utilizar cada item do objeto, tratando os itens do pedido
    items.map((item) => {
      item.productId = new ObjectId(item.productId);
      item.orderId = new ObjectId(newOrder.insertedId);
    });
    const result = await Mongo.db.collection("orderItems").insertMany(items); // Insere o produto na coleção
    return result;
  }

  // Método para excluir um pedidos pelo ID
  async deleteOrder(orderId) {
    const itemsToDelete = await Mongo.db
      .collection("orderItems")
      .deleteMany({ orderId: new ObjectId(orderId) });

    const orderToDelete = await Mongo.db
      .collection(collectionName)
      .findOneAndDelete({ _id: new ObjectId(orderId) }); // Exclui o pedidos pelo ID

    const result = {
      itemsToDelete,
      orderToDelete,
    };
    return result;
  }

  // Método para atualizar um pedidos pelo ID
  async updateOrder(orderId, orderData) {
    const result = await Mongo.db.collection(collectionName).findOneAndUpdate(
      { _id: new ObjectId(orderId) },
      { $set: orderData } // Atualiza os dados do pedidos com as novas informações
    );
    return result;
  }
}
