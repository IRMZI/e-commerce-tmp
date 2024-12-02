import { useEffect, useState } from "react";
import ordersService from "../../../services/order";
import Loading from "../../loading/page";
import "./AdminOrders.css";

export default function AdminOrders() {
  const { getOrders, ordersList, orderLoading, updateOrder, deleteOrder } =
    ordersService();

  const [editedOrders, setEditedOrders] = useState([]);

  useEffect(() => {
    getOrders(); // Carrega os pedidos ao montar o componente
  }, []);

  useEffect(() => {
    setEditedOrders(ordersList); // Inicializa os pedidos com os dados originais
  }, [ordersList]);

  const handleInputChange = (id, field, value) => {
    setEditedOrders((prev) =>
      prev.map((order) =>
        order._id === id ? { ...order, [field]: value } : order
      )
    );
  };

  const handleSave = async (id) => {
    const orderToSave = editedOrders.find((order) => order._id === id);
    await updateOrder(id, orderToSave); // Atualiza o pedido
    getOrders(); // Recarrega os pedidos
  };

  const handleDelete = async (id) => {
    await deleteOrder(id); // Exclui o pedido
    getOrders(); // Recarrega os pedidos
  };

  if (orderLoading) {
    return <Loading />;
  }

  return (
    <div className="admin-orders-container">
      <h2>Gerenciamento de Pedidos</h2>
      <hr className="admin-orders-separator" />

      <table className="admin-orders-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Status</th>
            <th>Total</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {editedOrders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>
                <input
                  type="text"
                  value={order.customer || ""}
                  onChange={(e) =>
                    handleInputChange(order._id, "customer", e.target.value)
                  }
                />
              </td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleInputChange(order._id, "status", e.target.value)
                  }
                >
                  <option value="pending">Pendente</option>
                  <option value="processing">Em Processamento</option>
                  <option value="completed">Concluído</option>
                  <option value="canceled">Cancelado</option>
                </select>
              </td>
              <td>
                <input
                  type="number"
                  value={order.total || 0}
                  onChange={(e) =>
                    handleInputChange(order._id, "total", e.target.value)
                  }
                />
              </td>
              <td>
                <button
                  className="admin-orders-save-button"
                  onClick={() => handleSave(order._id)}
                >
                  Salvar
                </button>
                <button
                  className="admin-orders-delete-button"
                  onClick={() => handleDelete(order._id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
