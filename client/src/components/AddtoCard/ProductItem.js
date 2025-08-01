import React, { useState } from 'react'
import './Cart.css'

export default function ProductItem({ quantity, product,removeItem }) {
  const [quantityItem, setQuantity] = useState(quantity);
  
  return (
    <div className="product-row">
      <div className="product-info">
        <img
          src={product.images?.[0] }
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
          onClick={() => setQuantity(quantityItem - 1)} 
          disabled={quantityItem <= 1}
        >-</button>
        <input
          type="number"
          className="qty-input"
          placeholder="0"
          value={quantityItem || ''}
          min={0}
          onChange={(e) => {
            const val = parseInt(e.target.value)
            if (val >= 0) {
              setQuantity(val)
            }
          }}
        />
        <button 
          className="qty-btn" 
          onClick={() => setQuantity(quantityItem + 1)}
        >+</button>
        <button className="remove-button" onClick={() => removeItem(product.id)}>Remove</button>
      </div>
    </div>
  )
}
