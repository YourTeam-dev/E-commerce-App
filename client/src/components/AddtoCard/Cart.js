import React, { useEffect, useState } from "react";
import "./Cart.css";
import ProductItem from "./ProductItem";

export default function ProductListWithQuantity({
  Cartproducts = [
    {
      _id: "1",
      title: "Fresh Gold Chicken",
      price: 333.58,
      images: ["https://loremflickr.com/445/3060?lock=1737649470394720"],
      quantity: 44,
      promo: 19,
    },
    {
      _id: "2",
      title: "Sleek Aluminum Pants",
      price: 826.2,
      images: ["https://loremflickr.com/3950/3280?lock=3251830751781103"],
      quantity: 90,
      promo: 30,
    },
    {
      _id: "3",
      title: "Refined Silk Computer",
      price: 973.59,
      images: ["https://picsum.photos/seed/yzpa13k/2050/1412"],
      quantity: 82,
      promo: 0,
    },
    {
      _id: "4",
      title: "Elegant Concrete Soap",
      price: 426.94,
      images: ["https://loremflickr.com/3006/460?lock=383103145910113"],
      quantity: 19,
      promo: 22,
    },
  ],
}) {
  const [cart, setCart] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  // Initialize cart quantities
  useEffect(() => {
    const cartMap = {};
    Cartproducts.forEach((item) => {
      cartMap[item._id] = 1; // default quantity is 1
    });
    setCart(cartMap);
  }, [Cartproducts]);

  // Recalculate total when cart or products change
  useEffect(() => {
    const total = Object.keys(cart).reduce((sum, productId) => {
      const product = Cartproducts.find((p) => p._id === productId);
      if (!product) return sum;
      return sum + product.price * cart[productId];
    }, 0);
    setTotalPrice(total);
  }, [cart, Cartproducts]);

  const handleOrder = async () => {
    console.log("Order submitted");
  };

  const handleRemove = (productId) => {
    const newCart = { ...cart };
    delete newCart[productId];
    setCart(newCart);
  };

  return (
    <div className="container">
      <div className="cart-layout">
        <div className="cart-left">
          <h2>Shopping Cart</h2>
          <p>{Object.keys(cart).length} items in your cart</p>
          {Object.keys(cart).length === 0 && <p>No products found</p>}

          {Object.keys(cart).map((productId) => {
            const product = Cartproducts.find((p) => p._id === productId);
            if (!product) return null;
            return (
              <ProductItem
                key={productId}
                product={product}
                quantity={cart[productId]}
                removeItem={() => handleRemove(productId)}
              />
            );
          })}
        </div>

        <div className="cart-right">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span className="free">Free</span>
          </div>
          <div className="summary-row">
            <span>Tax</span>
            <span>$0.00</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button className="checkout-button" onClick={handleOrder}>
            Proceed to Checkout
          </button>
          <p className="secure-note">
            Secure checkout powered by SSL encryption
          </p>
          <div className="payment-logos">
            <img
              src="https://img.icons8.com/color/48/000000/visa.png"
              alt="Visa"
            />
            <img
              src="https://img.icons8.com/color/48/000000/mastercard.png"
              alt="MasterCard"
            />
            <img
              src="https://img.icons8.com/color/48/000000/amex.png"
              alt="Amex"
            />
            <img
              src="https://img.icons8.com/color/48/000000/paypal.png"
              alt="PayPal"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
