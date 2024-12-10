import { useCartContext } from "../../contexts/useCartContext";
import { Link } from "react-router-dom";
import "./Cart.css";
import { HiTrash } from "react-icons/hi";
import { useState } from "react";
import ConfirmOrderPopup from "../../components/confirmOrderPopUp/confirmOrderPopup";
import orderServices from "../../services/order";

export default function Cart() {
  const { cartItems, updateCartItems, removeFromCart, clearCart } =
    useCartContext();
  const [confirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const { sendOrder } = orderServices();

  const updateItemQuantity = (mode, itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item._id === itemId) {
        if (mode === "less" && item.quantity > 1) {
          item.quantity -= 1;
        } else if (mode === "more") {
          item.quantity += 1;
        }
      }
      return item;
    });
    updateCartItems(updatedCartItems);
  };
  if (!cartItems.length) {
    return (
      <div className="cartEmpty">
        <h1>Carrinho vazio!</h1>
        <Link to="/products">
          <button className="btnSeeProducts">Veja nossos produtos</button>
        </Link>
      </div>
    );
  }
  const handleOpenPopup = (e) => {
    e.preventDefault();
    setConfirmPopupOpen(!confirmPopupOpen);
  };
  const handleConfirmOrder = (orderData) => {
    orderData.items = cartItems.map((item) => {
      return {
        productId: item._id,
        quantity: item.quantity,
      };
    });
    sendOrder(orderData);
    setConfirmPopupOpen(!confirmPopupOpen);
    clearCart();
  };
  return (
    <>
      <div className="cartContainer">
        <h1>Itens do pedido:</h1>
        <section className="cartItems">
          {cartItems.map((item) => (
            <div className="itemContainer" key={item._id}>
              <img src={item.imgUrl} alt={item.name} className="itemImage" />
              <div className="itemDetails">
                <h2 className="itemName">{item.name}</h2>
                <p className="itemPrice">Preço: R$ {item.price}</p>
                <div className="itemQuantity">
                  <button
                    className="quantityButton"
                    onClick={() => updateItemQuantity("less", item._id)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="quantityButton"
                    onClick={() => updateItemQuantity("more", item._id)}
                  >
                    +
                  </button>
                </div>
                <p className="itemCategory">Categoria: {item.category}</p>
                <button
                  className="quantityButton"
                  onClick={() => removeFromCart(item._id)}
                >
                  <HiTrash className="trashIcon" />
                </button>
              </div>
            </div>
          ))}
        </section>
        <div className="confirmContainer">
          <button className="confirmButton" onClick={handleOpenPopup}>
            Confirmar pedido!
          </button>
        </div>
      </div>

      <ConfirmOrderPopup
        open={confirmPopupOpen}
        onClose={handleOpenPopup}
        onConfirm={handleConfirmOrder}
      ></ConfirmOrderPopup>
    </>
  );
}
