import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authServices from "../../services/auth";
import orderServices from "../../services/order";
import "./profile.css";
import { Link } from "react-router-dom";
import Loading from "../loading/page";
import {
  HiLogout,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
} from "react-icons/hi";
export default function Profile() {
  const { logout } = authServices();
  const { getUserOrders, orderLoading, refetchOrders, ordersList } =
    orderServices();

  const navigate = useNavigate();
  const authData = JSON.parse(localStorage.getItem("auth"));

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

  console.log(ordersList);
  return (
    <div className="pageContainer font-cormorant">
      <div>
        <h1>{authData?.user?.fullname}</h1>
        <h3>{authData?.user?.email}</h3>
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
              <h3>Data de entrega estimada: {order.pickupTime}</h3>
              {order.orderItems.map((item) => (
                <div key={item._id}>
                  <h4>{item.itemDetails[0]}</h4>
                  <p>Quantity: {item.quantity}</p>
                </div>
              ))}
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
