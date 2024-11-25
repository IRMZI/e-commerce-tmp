import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const addToCart = (itemToAdd) => {
    const checkItemAlready = cartItems.find((cartItem) => {
      return cartItem._id === itemToAdd._id;
    });
    if (!checkItemAlready) {
      setCartItems([...cartItems, itemToAdd]);
      console.log("item adicionado no carrinho");
    } else {
      console.log("item ja adicionado no carrinho", checkItemAlready);
    }
    console.log(cartItems);
  };
  const updateCartItems = (items) => {
    setCartItems(items);
  };
  const removeFromCart = (itemId) => {
    const cartItemsCleared = cartItems.filter((item) => {
      return item._id !== itemId;
    });
    setCartItems(cartItemsCleared);
  };
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    console.log("perca de contexto no carrinho");
  }
  return context;
};
