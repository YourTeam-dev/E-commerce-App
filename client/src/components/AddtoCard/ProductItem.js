import React from "react";
export default function ProductItem({product,quantityChange}){
    return (
    <div className="mb-3">
        <span className="text-white">
            {product.title} - ${product.price.toFixed(2)}
        </span>
        <input 
        type="number"
        min="1"
        defaultValue={0}
        className="form-control d-inline w-25 ms-2"
        onChange={(e)=> quantityChange(product._id,e.target.value)}
        />
      
    </div> 
    )
}