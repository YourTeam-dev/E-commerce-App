import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import useCart from "../../hooks/useCart";

export default function ProductListWithQuantity() {
  const { cartProduct, removeFromCart, addToCart } = useCart();
  const [cart, setCart] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const cartMap = {};
    cartProduct.forEach((item) => {
      cartMap[item._id] = (cartMap[item._id] || 0) + 1;
    });
    setCart(cartMap);
  }, [cartProduct]);

  useEffect(() => {
    const total = Object.entries(cart).reduce((sum, [productId, qty]) => {
      const product = cartProduct.find((p) => p._id === productId);
      if (!product) return sum;
      return sum + product.price * qty;
    }, 0);
    setTotalPrice(total);
  }, [cart, cartProduct]);

  const handleQuantityChange = (productId, newQty) => {
    setCart((prev) => ({
      ...prev,
      [productId]: newQty,
    }));
  };

  const handleRemove = (productId) => {
    const newCart = { ...cart };
    delete newCart[productId];
    setCart(newCart);
    removeFromCart(productId,true);
  };

  const handleOrder = () => {
    console.log("Order submitted:", cart);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8 bg-white p-6 rounded-xl shadow-md">
        {/* Cart Left */}
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-2">Shopping Cart</h2>
          <p className="mb-4 text-sm text-gray-600">
            {Object.keys(cart).length} item(s) in your cart
          </p>

          {Object.keys(cart).length === 0 && <p>No products found</p>}

          {Object.keys(cart).map((productId) => {
            const product = cartProduct.find((p) => p._id === productId);
            if (!product) return null;

            return (
              <ProductItem
                key={productId}
                product={product}
                quantity={cart[productId]}
                removeItem={handleRemove}
                onQuantityChange={handleQuantityChange}
                addProduct={addToCart}
                removeProduct={removeFromCart}
              />
            );
          })}
        </div>

        {/* Cart Right */}
        <div className="w-full lg:w-1/3 border-t lg:border-t-0 lg:border-l border-gray-200 pt-6 lg:pt-0 lg:pl-6">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <div className="flex justify-between mb-2 text-sm">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2 text-sm">
            <span>Shipping</span>
            <span className="text-green-600 font-semibold">Free</span>
          </div>
          <div className="flex justify-between mb-2 text-sm">
            <span>Tax</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between border-t border-gray-300 pt-4 font-bold text-base">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button
            className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
            onClick={handleOrder}
          >
            Proceed to Checkout
          </button>
          <p className="text-xs text-center text-gray-500 mt-2">
            Secure checkout powered by SSL encryption
          </p>

          <div className="flex justify-center gap-4 mt-4">
            <img
              src="https://img.icons8.com/color/48/000000/visa.png"
              alt="Visa"
              className="h-8"
            />
            <img
              src="https://img.icons8.com/color/48/000000/mastercard.png"
              alt="MasterCard"
              className="h-8"
            />
            <img
              src="https://img.icons8.com/color/48/000000/amex.png"
              alt="Amex"
              className="h-8"
            />
            <img
              src="https://img.icons8.com/color/48/000000/paypal.png"
              alt="PayPal"
              className="h-8"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
