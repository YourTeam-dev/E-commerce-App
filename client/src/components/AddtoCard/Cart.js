import React, { useEffect, useState } from 'react'
import './Cart.css'
import ProductItem from './ProductItem'

export default function ProductListWithQuantity() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})


  useEffect(() => {
    fetch('/api/products') 
      .then(res => res.json())
      .then(data => {
        setProducts(data)
      })
      .catch(err => console.error(err))
  }, [])

  const handleQuantityChange = (productId, quantity) => {
    if (quantity > 0) {
      setCart(prev => ({ ...prev, [productId]: quantity }))
    } else {
      const updatedCart = { ...cart }
      delete updatedCart[productId]
      setCart(updatedCart)
    }
  }

  const handleOrder = () => {
    const orderItems = Object.entries(cart).map(([productId, quantity]) => ({
      productId, quantity
    }))
    if (orderItems.length === 0) {
      alert("Please select quantity for at least one product")
      return
    }
    alert("Order placed!")
  }

  const itemCount = Object.values(cart).reduce((a, b) => a + b, 0)
  const totalPrice = products.reduce((acc, product) => {
    const quantity = cart[product._id] || 0
    return acc + product.price * quantity
  }, 0)

  return (
    <div className="container">
      <div className="cart-layout">
        <div className="cart-left">
          <h2>Shopping Cart</h2>
          <p>{itemCount} items in your cart</p>

          {products.map(product => {
            const quantity = cart[product._id] || 0
            return (
              <ProductItem
                key={product._id}
                product={product}
                quantity={quantity}
                quantityChange={handleQuantityChange}
              />
            )
          })}

          {products.length === 0 && (
            <p>No products found</p>
          )}
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
          <button className="checkout-button" onClick={handleOrder}>Proceed to Checkout</button>
          <p className="secure-note">Secure checkout powered by SSL encryption</p>
          <div className="payment-logos">
            <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" />
            <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="MasterCard" />
            <img src="https://img.icons8.com/color/48/000000/amex.png" alt="Amex" />
            <img src="https://img.icons8.com/color/48/000000/paypal.png" alt="PayPal" />
          </div>
        </div>
      </div>
    </div>
  )
}
