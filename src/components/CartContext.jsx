
import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(product, quantity = 1) {
    // MongoDB product ID must be preserved
    const productId = product._id || product.productId || product.id;

    if (!productId) {
      console.error("Product ID is missing:", product);
      alert("Product ID missing. Please refresh the products page.");
      return;
    }

    setCartItems((items) => {
      const existing = items.find(
        (item) => String(item.productId) === String(productId)
      );

      if (existing) {
        return items.map((item) =>
          String(item.productId) === String(productId)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...items,
        {
          ...product,
          id: String(productId),
          _id: String(productId),
          productId: String(productId),
          quantity,
        },
      ];
    });
  }

  function updateQuantity(id, change) {
    setCartItems((items) =>
      items
        .map((item) =>
          String(item.productId) === String(id)
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(id) {
    setCartItems((items) =>
      items.filter(
        (item) => String(item.productId) !== String(id)
      )
    );
  }

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      totalItems,
      totalPrice,
    }),
    [cartItems, totalItems, totalPrice]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
