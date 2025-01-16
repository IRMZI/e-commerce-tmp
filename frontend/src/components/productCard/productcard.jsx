import "./productCard.css";
import { HiShoppingCart } from "react-icons/hi";
import { useState } from "react";
import { useCartContext } from "../../contexts/useCartContext";

export default function ProductCard({ productData }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartContext(); // Hook para acessar o contexto
  const [showNotification, setShowNotification] = useState(false);

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    const itemToAdd = {
      ...productData,
      quantity,
    };
    addToCart(itemToAdd); // Adiciona ao carrinho
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <>
      {showNotification && (
        <div className="global-notification">
          Item adicionado ao carrinho!
        </div>
      )}
      <div className="card">
        <img
          src={productData.imgUrl}
          alt={productData.name}
          className="card-img"
        />
        <div className="card-content">
          <h4 className="card-title">{productData.name}</h4>
          <p className="card-description">{productData.description}</p>
          <h4 className="card-price">R$ {productData.price}</h4>
          <p className="card-weight">Peso: 200g</p>

          <div className="quantity-controls">
            <button className="quantity-btn" onClick={decrementQuantity}>
              -
            </button>
            <span className="quantity">{quantity}</span>
            <button className="quantity-btn" onClick={incrementQuantity}>
              +
            </button>
          </div>

          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            <HiShoppingCart />
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </>
  );
}
