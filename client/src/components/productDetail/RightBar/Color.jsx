import React from 'react'

const Color = () => {
  return (
    <div>
              <div>
        <label style={{ fontSize: "16px" }}>Color</label>
        <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
          <div
            style={{
              width: "20px",
              height: "20px",
              background: "#000",
              borderRadius: "50%",
            }}
          ></div>
          <div
            style={{
              width: "20px",
              height: "20px",
              background: "#fff",
              border: "1px solid #ccc",
              borderRadius: "50%",
            }}
          ></div>
          <div
            style={{
              width: "20px",
              height: "20px",
              background: "#6a87c7",
              borderRadius: "50%",
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default Color