import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authServices from "../../services/auth";
import orderServices from "../../services/order";
import addressServices from "../../services/address";
import { TextField } from "@material-ui/core";
import "./profile.css";
import { Link } from "react-router-dom";
import Loading from "../loading/page";
import { HiLogout } from "react-icons/hi";
export default function Profile() {
  const { logout } = authServices();
  const { getUserOrders, orderLoading, refetchOrders, ordersList } =
    orderServices();
  const { updateUserAddress } = addressServices();
  const navigate = useNavigate();
  const authData = JSON.parse(localStorage.getItem("auth"));
  const [isEditing, setIsEditing] = useState(false);
  const [editedAddress, setEditedAddress] = useState({
    street: authData?.user?.address?.street || "",
    number: authData?.user?.address?.number || "",
    city: authData?.user?.address?.city || "",
    zipcode: authData?.user?.zipcode || "",
  });

  useEffect(() => {
    if (!authData) {
      return navigate("/auth");
    } else if (refetchOrders) {
      getUserOrders(authData?.user?._id);
    }
  }, [authData, refetchOrders]);
  if (orderLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  const handleLogout = () => {
    logout();
    return navigate("/");
  };

  const handleEditAddress = () => {
    setIsEditing(true);
  };

  const handleSaveAddress = async () => {
    try {
      const userId = authData?.user?._id; // ID do usuário
      const result = await updateUserAddress(userId, editedAddress);
      alert(result);
      if (result.success) {
        setIsEditing(false);
        alert("Endereço atualizado com sucesso! faça login novamente");
        return navigate("/auth");
      } else {
        console.error(result.message || "Erro ao atualizar o endereço.");
      }
    } catch (error) {
      alert("Houve um problema ao salvar o endereço.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedAddress((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="profile-container">
      <section className="user-card">
        <h1>{authData?.user?.fullname || "Usuário não identificado"}</h1>
        <p>
          <strong>Email:</strong>{" "}
          {authData?.user?.email || "Email não disponível"}
        </p>
        <p>
          <strong>Telefone:</strong>{" "}
          {authData?.user?.phone || "Telefone não disponível"}
        </p>
        <p>
          <strong>ID:</strong> {authData?.user?._id || "ID não disponível"}
        </p>
        <p>
          <strong>CEP:</strong> {authData?.user?.zipcode || "CEP não informado"}
        </p>
        <div className="address-section">
          <h3>Endereço</h3>
          {isEditing ? (
            <form className="address-form">
              <TextField
                name="street"
                value={editedAddress.street}
                onChange={handleChange}
                label="Rua"
              />
              <TextField
                name="number"
                value={editedAddress.number}
                onChange={handleChange}
                label="Número"
              />
              <TextField
                name="city"
                value={editedAddress.city}
                onChange={handleChange}
                label="Cidade"
              />
              <TextField
                name="zipcode"
                value={editedAddress.zipcode}
                onChange={handleChange}
                label="CEP"
              />
              <button onClick={handleSaveAddress} className="save-btn">
                Salvar
              </button>
            </form>
          ) : (
            <div className="address-display">
              <p>
                {authData?.user?.address?.street || "Rua não informada"},
                {authData?.user?.address?.number || "Número não informado"} -
                {authData?.user?.address?.city || "Cidade não informada"}
              </p>
              <button onClick={handleEditAddress} className="edit-btn">
                Editar Endereço
              </button>
            </div>
          )}
        </div>
        {authData?.user?.isAdmin && (
          <button className="admin-btn">Painel de Admin</button>
        )}
      </section>

      <section className="orders-card">
        <h2>Pedidos</h2>
        {ordersList.length > 0 ? (
          <div className="orders-table-wrapper">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Status</th>
                  <th>Data</th>
                  <th>Itens</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {ordersList.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td className={`pickup-status ${order.pickupStatus}`}>
                      {order.pickupStatus}
                    </td>
                    <td>{order.pickupTime || "Não informado"}</td>
                    <td>
                      {order.orderItems.map((item) => (
                        <div key={item._id}>
                          <strong>
                            {item.itemDetails[0]?.name || "Indisponível"}
                          </strong>
                          <span> - Quantidade: {item.quantity}</span>
                        </div>
                      ))}
                    </td>
                    <td>
                      <button className="details-btn">Ver Detalhes</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>
            Você não possui pedidos.{" "}
            <Link to="/products">Veja nossos produtos!</Link>
          </p>
        )}
      </section>

      <button onClick={handleLogout} className="logout-btn">
        Sair <HiLogout />
      </button>
    </div>
  );
}
