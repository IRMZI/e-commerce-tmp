import { useState } from "react";

export default function orderServices() {
  const [orderLoading, setOrderLoading] = useState(false);
  const [ordersList, setOrdersList] = useState([]);
  const [refetchOrders, setRefetchOrders] = useState(true);
  const url = "http://localhost:3000/orders";

  const getOrders = async () => {
    setOrderLoading(true);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.success) {
        setOrdersList(result.body);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    } finally {
      setOrderLoading(false);
      setRefetchOrders(false);
    }
  };

  const getUserOrders = async (userId) => {
    setOrderLoading(true);
    try {
      const response = await fetch(`${url}/userorders/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.success) {
        setOrdersList(result.body);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("Erro ao buscar pedidos do usuário:", error);
    } finally {
      setOrderLoading(false);
      setRefetchOrders(false);
    }
  };

  const sendOrder = async (orderData) => {
    setOrderLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      const result = await response.json();
      if (!result.success) {
        console.error(result.message);
      }
      return result;
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      throw error;
    } finally {
      setOrderLoading(false);
    }
  };

  const updateOrder = async (orderId, orderData) => {
    setOrderLoading(true);
    try {
      const response = await fetch(`${url}/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      const result = await response.json();
      if (!result.success) {
        console.error(result.message);
      }
      return result;
    } catch (error) {
      console.error("Erro ao atualizar pedido:", error);
      throw error;
    } finally {
      setOrderLoading(false);
    }
  };

  const deleteOrder = async (orderId) => {
    setOrderLoading(true);
    try {
      const response = await fetch(`${url}/${orderId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (!result.success) {
        console.error(result.message);
      }
      return result;
    } catch (error) {
      console.error("Erro ao excluir pedido:", error);
      throw error;
    } finally {
      setOrderLoading(false);
    }
  };

  const addItemToOrder = async (orderId, itemData) => {
    setOrderLoading(true);
    try {
      const response = await fetch(`${url}/${orderId}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemData),
      });
      const result = await response.json();
      if (!result.success) {
        console.error(result.message);
      }
      return result;
    } catch (error) {
      console.error("Erro ao adicionar item ao pedido:", error);
      throw error;
    } finally {
      setOrderLoading(false);
    }
  };

  const updateItemQuantity = async (orderId, itemId, quantity) => {
    setOrderLoading(true);
    try {
      const response = await fetch(`${url}/${orderId}/items/${itemId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      });
      const result = await response.json();
      if (!result.success) {
        console.error(result.message);
      }
      return result;
    } catch (error) {
      console.error("Erro ao atualizar quantidade do item:", error);
      throw error;
    } finally {
      setOrderLoading(false);
    }
  };

  const removeItemFromOrder = async (orderId, itemId) => {
    setOrderLoading(true);
    try {
      const response = await fetch(`${url}/${orderId}/items/${itemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (!result.success) {
        console.error(result.message);
      }
      return result;
    } catch (error) {
      console.error("Erro ao remover item do pedido:", error);
      throw error;
    } finally {
      setOrderLoading(false);
    }
  };

  return {
    getOrders,
    getUserOrders,
    sendOrder,
    updateOrder,
    deleteOrder,
    addItemToOrder,
    updateItemQuantity,
    removeItemFromOrder,
    orderLoading,
    ordersList,
    refetchOrders,
  };
}
