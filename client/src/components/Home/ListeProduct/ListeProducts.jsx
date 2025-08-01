import React, {  useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { Loader } from 'lucide-react';

function ListeProducts({products}) {
  if (!products) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }
  if(products.length === 0){
    return (
      <div className="flex items-center justify-center h-screen">
        <p>No products found</p>
      </div>
    );
  }
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 my-3">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl overflow-hidden transition-transform hover:scale-105"
          >
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 text-center text-black">
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <button className="mt-3 bg-black hover:bg-gray-800 text-white text-sm font-medium py-2 px-4 rounded-full">
                View Product
              </button>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default ListeProducts
