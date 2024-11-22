import "./productCard.css";
import { HiShoppingCart } from "react-icons/hi";
import { useState } from "react";

export default function ProductCard({ productData }) {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${productData.name} to the cart.`);
  };

  return (
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
  );
}
