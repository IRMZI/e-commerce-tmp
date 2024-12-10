import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const addToCart = (itemToAdd) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find(
        (cartItem) => cartItem._id === itemToAdd._id
      );
      if (existingItem) {
        // Incrementa a quantidade do item existente
        return prevCartItems.map((cartItem) =>
          cartItem._id === itemToAdd._id
            ? { ...cartItem, quantity: cartItem.quantity + itemToAdd.quantity }
            : cartItem
        );
      } else {
        // Adiciona um novo item ao carrinho
        return [...prevCartItems, itemToAdd];
      }
    });
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
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItems,
        clearCart,
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
