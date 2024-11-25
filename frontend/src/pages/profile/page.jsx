import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authServices from "../../services/auth";
import orderServices from "../../services/order";
import { TextField } from "@material-ui/core";
import "./profile.css";
import { Link } from "react-router-dom";
import Loading from "../loading/page";
import {
  HiLogout,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiPencil,
} from "react-icons/hi";
export default function Profile() {
  const { logout } = authServices();
  const { getUserOrders, orderLoading, refetchOrders, ordersList } =
    orderServices();

  const navigate = useNavigate();
  const authData = JSON.parse(localStorage.getItem("auth"));
  const [isEditing, setIsEditing] = useState(false);
  const [editedAddress, setEditedAddress] = useState({
    street: authData?.user?.address?.street || "",
    number: authData?.user?.address?.number || "",
    city: authData?.user?.address?.city || "",
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

  const handleSaveAddress = () => {
    // Enviar a alteração do endereço para o servidor (adicione a lógica de atualização)
    // Exemplo de envio da alteração (você pode criar o serviço ou API para isso):
    // updateAddress(editedAddress);

    setIsEditing(false);
    // Aqui você pode chamar a função que envia a alteração para o servidor
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedAddress((prev) => ({ ...prev, [name]: value }));
  };

  console.log(ordersList);
  return (
    <div className="pageContainer font-cormorant">
      <div>
        <h1>{authData?.user?.fullname}</h1>
        <h3>{authData?.user?.email}</h3>
        <div>
          {isEditing ? (
            <div className="addressContainer">
              <TextField
                type="text"
                name="street"
                value={editedAddress.street}
                onChange={handleChange}
                placeholder="Rua"
              />
              <TextField
                type="text"
                name="number"
                value={editedAddress.number}
                onChange={handleChange}
                placeholder="Número"
              />
              <TextField
                type="text"
                name="city"
                value={editedAddress.city}
                onChange={handleChange}
                placeholder="Cidade"
              />
              <button onClick={handleSaveAddress}>Salvar</button>
            </div>
          ) : (
            <div className="addressContainer">
              <h3>
                {authData?.user?.address?.street},{" "}
                {authData?.user?.address?.number} -{" "}
                {authData?.user?.address?.city}
              </h3>
              <a onClick={handleEditAddress}>
                <HiPencil />
              </a>
            </div>
          )}
        </div>
      </div>

      <button onClick={handleLogout}>
        Logout <HiLogout />
      </button>

      {ordersList.length > 0 ? (
        <div className="ordersContainer">
          {ordersList.map((order) => (
            <div key={order._id} className="orderContainer">
              {order.pickupStatus === "pending" ? (
                <p className="pickupStatus pending font-koulen">
                  <HiOutlineClock />
                  Pendente
                </p>
              ) : null}
              {order.pickupStatus === "completed" ? (
                <p className="pickupStatus completed font-koulen">
                  <HiOutlineCheckCircle />
                  Entregue
                </p>
              ) : null}
              {order.pickupStatus === "canceled" ? (
                <p className="pickupStatus canceled font-koulen">
                  <HiOutlineXCircle />
                  Cancelado
                </p>
              ) : null}
              <h3>Número do pedido: {order._id}</h3>
              <h3>Melhor horário para entrega: {order.pickupTime}</h3>
              <div className="orderItemsContainer">
                {order.orderItems.map((item) => (
                  <div key={item._id}>
                    <h4>
                      {item.itemDetails[0]?.name || "Detalhes indisponíveis"}
                    </h4>
                    <p>Quantidade: {item.quantity}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>Você não possui pedidos</p>
          <Link to={"/products"} className="productsLink">
            Clique aqui para ver nossos produtos!
          </Link>
        </div>
      )}
    </div>
  );
}
