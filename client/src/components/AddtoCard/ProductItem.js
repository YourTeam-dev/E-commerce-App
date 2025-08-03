import React, { useEffect, useState } from 'react';

export default function ProductItem({
  quantity,
  product,
  removeItem,
  onQuantityChange,
  addProduct,         
  removeProduct       
}) {
  const [quantityItem, setQuantityItem] = useState(quantity);

  useEffect(() => {
    setQuantityItem(quantity);
  }, [quantity]);

  const handleIncrement = () => {
    if (quantityItem < product.quantity) {
      setQuantityItem(prev => prev + 1);
      onQuantityChange(product._id, quantityItem + 1);
      addProduct(product); // <- Call from hook
    }
  };

  const handleDecrement = () => {
    if (quantityItem > 1) {
      setQuantityItem(prev => prev - 1);
      onQuantityChange(product._id, quantityItem - 1);
      removeProduct(product._id); // <- Call from hook
    }
  };

  return (
    <div className="flex justify-between items-center border-b pb-4 mb-4">
      <div className="flex items-center gap-4 flex-1">
        <img src={product.images?.[0]} alt={product.title} className="w-20 h-20 object-cover rounded border" />
        <div>
          <h4 className="font-semibold">{product.title}</h4>
          <p>${product.price.toFixed(2)}</p>
          <p className="text-sm text-gray-500">In stock: {product.quantity}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300 text-lg"
          onClick={handleDecrement}
          disabled={quantityItem <= 1}
        >
          −
        </button>
        <input
          type="number"
          className="w-14 border text-center rounded"
          value={quantityItem}
          min={1}
          max={product.quantity}
          readOnly
        />
        <button
          className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300 text-lg"
          onClick={handleIncrement}
          disabled={quantityItem >= product.quantity}
        >
          +
        </button>

        <button
          className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
          onClick={() => removeItem(product._id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
