import React, { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [productsCart, setProductsCart] = useState([]);

  const addToCart = (product) => {
    const existe = productsCart.find((p) => p.id === product.id);

    if (existe) {
      const cartActualized = productsCart.map((p) => {
        if (p.id === product.id) {
          return {
            ...p,
            quantity: p.quantity + product.quantity,
          };
        }
        return p;
      });
      setProductsCart(cartActualized);
    } else {
      setProductsCart([...productsCart, { ...product, quantity: product.quantity || 1 }]);
    }
  };

  const clearCart = () => {
    setProductsCart([]);
  };

  const deleteProductCart = (id) => {
    const newCart = productsCart.filter((p) => p.id !== id);
    setProductsCart(newCart);
  };

  const cartCount = productsCart.reduce((total, item) => total + (item.quantity || 0), 0);

  return (
    <CartContext.Provider
      value={{
        productsCart,
        addToCart,
        clearCart,
        deleteProductCart,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
