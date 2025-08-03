import { useState, useEffect } from "react";

export default function useCart() {
  const [cartProduct, setCartProduct] = useState([]);

  const loadCart = () => {
    setCartProduct(JSON.parse(localStorage.getItem("cart")) || []);
  };

  const addToCart = (item) => {
    localStorage.setItem("cart", JSON.stringify([...cartProduct, item]));
    setCartProduct([...cartProduct, item]);
    window.dispatchEvent(new Event("cart-updated"));
  };

  const removeFromCart = (itemId, all = false) => {
    if (all) {
      const updatedCart = cartProduct.filter((item) => item._id !== itemId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCartProduct(updatedCart);
      window.dispatchEvent(new Event("cart-updated"));
    } else {
      const indexToRemove = cartProduct.findIndex(
        (item) => item._id === itemId
      );
      if (indexToRemove !== -1) {
        const updatedCart = [...cartProduct];
        updatedCart.splice(indexToRemove, 1);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCartProduct(updatedCart);
        window.dispatchEvent(new Event("cart-updated"));
      }
    }
  };

  useEffect(() => {
    loadCart();
    window.addEventListener("cart-updated", loadCart);
    window.addEventListener("storage", loadCart);

    return () => {
      window.removeEventListener("cart-updated", loadCart);
      window.removeEventListener("storage", loadCart);
    };
  }, []);

  return {
    cartProduct,
    addToCart,
    removeFromCart,
  };
}
