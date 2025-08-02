import React, { useEffect, useState } from "react"
import { handleOrder, getUserLatestOrder } from "../../API/HandleOrder"


export default function CartComponent() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})
  const userId = "userId"

  useEffect(() => {
    getUserLatestOrder(userId)
      .then(order => {
        if (order?.listeProduct?.length > 0) {
          const cartMap = {}
          order.listeProduct.forEach(item => {
            cartMap[item.productId._id] = item.quantity
          })
          setCart(cartMap)
          setProducts(order.listeProduct.map(item => item.productId))
        }
      })
      .catch(err => console.error(err))
  }, [userId])

  const handleQuantityChange = (productId, quantity) => {
    setCart(prev => {
      const updated = { ...prev }
      if (quantity > 0) {
        updated[productId] = quantity
      } else {
        delete updated[productId]
      }
      return updated
    })
  }

  const submitOrderHandler = () => {
    const orderItems = Object.entries(cart).map(([productId, quantity]) => ({
      productId,
      quantity,
    }))

    if (orderItems.length === 0) {
      alert("No product passed yet")
      return
    }

    handleOrder({
      userId,
      listeProduct: orderItems,
    })
      .then(() => {
        alert("Order passed successfully!")
        setCart({})
      })
      .catch(err => console.error(err))
  }

  const itemCount = Object.values(cart).reduce((a, b) => a + b, 0)
  const totalPrice = products.reduce((acc, product) => {
    const quantity = cart[product._id] || 0
    return acc + product.price * quantity
  }, 0)

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-lg-8 mb-4">
          <h2 className="fw-bold">Shopping Cart</h2>
          <p className="text-muted">{itemCount} items in your cart</p>

          <div className="card p-3 shadow rounded-4">
            {Object.keys(cart).length === 0 ? (
              <>
                <p className="text-center text-muted fw-bold">
                  No product passed yet. Please choose a product.
                </p>
                <div className="row g-3 align-items-center pb-3">
                  <div className="col-md-3">
                    <div
                      className="bg-light border rounded"
                      style={{ width: "100%", height: "80px" }}
                    />
                  </div>
                  <div className="col-md-6 placeholder-glow">
                    <p className="placeholder col-6 mb-1"></p>
                    <p className="placeholder col-4 mb-1"></p>
                  </div>
                  <div className="col-md-3 text-end">
                    <button className="btn btn-sm btn-link text-danger mb-2" disabled>
                      Remove
                    </button>
                    <div className="input-group">
                      <button className="btn btn-outline-secondary" disabled>
                        -
                      </button>
                      <input
                        type="number"
                        className="form-control text-center px-1"
                        style={{ maxWidth: "60px" }}
                        disabled
                      />
                      <button className="btn btn-outline-secondary" disabled>
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              products.map(product => {
                const quantity = cart[product._id] || 0
                return (
                  <div
                    key={product._id}
                    className="row g-3 align-items-center pb-3 border-bottom"
                  >
                    <div className="col-md-3">
                      <img
                        src={product.images?.[0]}
                        alt={product.title}
                        className="img-fluid rounded"
                      />
                    </div>
                    <div className="col-md-6">
                      <h5>{product.title}</h5>
                      {product.category === "clothing" && (
                        <p className="text-muted mb-1">
                          Color: {product.color} | Size: {product.size}
                        </p>
                      )}
                      <p className="text-muted mb-1">${product.price.toFixed(2)}</p>
                    </div>
                    <div className="col-md-3 text-end">
                      <button
                        className="btn btn-sm btn-link text-danger mb-2"
                        onClick={() => handleQuantityChange(product._id, 0)}
                      >
                        Remove
                      </button>
                      <div className="input-group">
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() =>
                            handleQuantityChange(product._id, quantity - 1)
                          }
                          disabled={quantity <= 1}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="form-control text-center px-1"
                          style={{ maxWidth: "60px" }}
                          value={quantity}
                          min={0}
                          onChange={e =>
                            handleQuantityChange(
                              product._id,
                              Math.max(0, parseInt(e.target.value) || 0)
                            )
                          }
                        />
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() =>
                            handleQuantityChange(product._id, quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card p-3 shadow rounded-4">
            <h5 className="fw-bold">Order Summary</h5>
            <div className="d-flex justify-content-between">
              <span>Subtotal ({itemCount} items)</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Savings</span>
              <span className="text-success">-${(totalPrice * 0.23).toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Shipping</span>
              <span>Soon</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Tax</span>
              <span>$0.00</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <button className="btn btn-primary w-100 mt-3" onClick={submitOrderHandler}>
              Proceed to Checkout
            </button>
            <div className="payment-logos d-flex justify-content-center gap-3 my-3">
              <img
                src="https://img.icons8.com/color/48/000000/visa.png"
                alt="Visa"
                style={{ height: 30 }}
              />
              <img
                src="https://img.icons8.com/color/48/000000/mastercard.png"
                alt="MasterCard"
                style={{ height: 30 }}
              />
              <img
                src="https://img.icons8.com/color/48/000000/amex.png"
                alt="Amex"
                style={{ height: 30 }}
              />
              <img
                src="https://img.icons8.com/color/48/000000/paypal.png"
                alt="PayPal"
                style={{ height: 30 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
