import React from 'react'

const Size = () => {
  return (
    <div>
         <div>
        <label style={{ fontSize: "16px" }}>Size</label>
        <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
          <button
            style={{
              padding: "5px 10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            S
          </button>
          <button
            style={{
              padding: "5px 10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            M
          </button>
          <button
            style={{
              padding: "5px 10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            L
          </button>
        </div>
      </div>
    </div>
  )
}

export default Size