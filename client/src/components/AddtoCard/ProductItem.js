import React from 'react'
import './Cart.css'

export default function ProductItem({ quantity, product, quantityChange }) {
  return (
    <div className="product-row">
      <div className="product-info">
        <img
          src={product.images?.[0] || 'https://via.placeholder.com/80'}
          alt={product.title}
          className="product-img"
        />
        <div>
          <h4>{product.title}</h4>
          <p>${product.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="quantity-controls">
        <button 
          className="qty-btn" 
          onClick={() => quantityChange(product._id, quantity - 1)} 
          disabled={quantity <= 1}
        >-</button>
        <input
          type="number"
          className="qty-input"
          placeholder="0"
          value={quantity || ''}
          min={0}
          onChange={(e) => {
            const val = parseInt(e.target.value)
            quantityChange(product._id, isNaN(val) ? 0 : val)
          }}
        />
        <button 
          className="qty-btn" 
          onClick={() => quantityChange(product._id, quantity + 1)}
        >+</button>
        <button className="remove-button" onClick={() => quantityChange(product._id, 0)}>Remove</button>
      </div>
    </div>
  )
}
