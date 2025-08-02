import React from "react"


export default function ProductItem({ quantity, product, quantityChange }) {
  const isClothing = product.category === "clothing"

  return (
    <>
      <style>{`.hover-shadow:hover 
      { box-shadow: 0 6px 20px rgba(0,0,0,0.2);
        transition: box-shadow 0.3s ease;}`}
        </style>

      <div className="card rounded-5 shadow-sm p-3 mb-3 bg-white hover-shadow">
        <div className="d-flex align-items-center gap-3">
          <img
            src={product.images?.[0]}
            alt={product.title}
            className="rounded border"
            style={{ width: "80px", height: "80px", objectFit: "cover" }}
          />
          <div className="flex-grow-1">
            <h5 className="mb-1">{product.title}</h5>
            <p className="text-muted mb-1">${product.price.toFixed(2)}</p>
            {isClothing && product.size && product.color && (
              <p className="text-muted small mb-0">
                Color: {product.color} | Size: {product.size}
              </p>
            )}
          </div>
          <div className="text-end d-flex flex-column align-items-end">
            <button
              className="btn btn-sm btn-link text-danger mb-2 p-0"
              onClick={() => quantityChange(product._id, 0)}
            >
              Remove
            </button>
            <div className="input-group input-group-sm" style={{ width: "110px" }}>
              <button
                className="btn btn-outline-secondary"
                onClick={() => quantityChange(product._id, quantity - 1)}
                disabled={quantity <= 1}
              >
                -
              </button>
              <input
                type="number"
                className="form-control text-center"
                value={quantity || ""}
                min={0}
                onChange={e => {
                  const val = parseInt(e.target.value)
                  quantityChange(product._id, isNaN(val) ? 0 : val)
                }}
                style={{ width: "40px" }}
              />
              <button
                className="btn btn-outline-secondary"
                onClick={() => quantityChange(product._id, quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
