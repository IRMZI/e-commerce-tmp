import { useState } from "react";

export default function orderServices() {
  const [orderLoading, setOrderLoading] = useState(false);
  const [ordersList, setOrdersList] = useState([]);
  const url = "http://localhost:3000/orders";

  // Função para buscar todos os pedidos
  const getOrders = () => {
    setOrderLoading(true);
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setOrdersList(result.body);
        } else {
          console.error(result.message);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar pedidos:", error);
      })
      .finally(() => {
        setOrderLoading(false);
      });
  };

  // Função para buscar pedidos de um usuário específico
  const getUserOrders = (userId) => {
    setOrderLoading(true);
    fetch(`${url}/userorders/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setOrdersList(result.body);
        } else {
          console.error(result.message);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar pedidos do usuário:", error);
      })
      .finally(() => {
        setOrderLoading(false);
      });
  };

  // Função para criar um novo pedido
  const sendOrder = (orderData) => {
    setOrderLoading(true);
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => response.json())
      .then((result) => {
        if (!result.success) {
          console.error(result.message);
        }
        return result;
      })
      .catch((error) => {
        console.error("Erro ao criar pedido:", error);
        throw error;
      })
      .finally(() => {
        setOrderLoading(false);
      });
  };

  // Função para atualizar um pedido
  const updateOrder = (orderId, orderData) => {
    setOrderLoading(true);
    return fetch(`${url}/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => response.json())
      .then((result) => {
        if (!result.success) {
          console.error(result.message);
        }
        return result;
      })
      .catch((error) => {
        console.error("Erro ao atualizar pedido:", error);
        throw error;
      })
      .finally(() => {
        setOrderLoading(false);
      });
  };

  // Função para excluir um pedido
  const deleteOrder = (orderId) => {
    setOrderLoading(true);
    return fetch(`${url}/${orderId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (!result.success) {
          console.error(result.message);
        }
        return result;
      })
      .catch((error) => {
        console.error("Erro ao excluir pedido:", error);
        throw error;
      })
      .finally(() => {
        setOrderLoading(false);
      });
  };

  return {
    getOrders,
    getUserOrders,
    sendOrder,
    updateOrder,
    deleteOrder,
    orderLoading,
    ordersList,
  };
}
