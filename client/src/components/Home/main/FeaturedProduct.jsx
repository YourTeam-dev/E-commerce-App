import React, { use, useState } from 'react';
import { useEffect } from 'react';
import { getFeaturedProduct } from '../../../API/FetchProducts';
import { useNavigate } from 'react-router-dom';
function FeaturedProduct() {
  const baseUrl = process.env.REACT_APP_IMAGE_URL;
  const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    useEffect(() => {
      getFeaturedProduct().then((res) => {
        setProducts(res?.slice(0, 4) );
      });
    }, []);


  return (
    <div className="w-full h-auto py-10 bg-[#d58a94]">
      <div className="flex flex-col items-center w-full text-white">
        <p className="text-center text-3xl font-bold mb-4">Featured Products</p>
        <p className="text-center text-sm mb-6">Browse some of our top selections this week</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl overflow-hidden transition-transform hover:scale-105"
          >
            <img
              src={`${baseUrl}${product.images[0]}`}
              alt={product.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 text-center text-black">
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <button onClick={() => navigate(`/product`,{state:{productId:product._id}})} className="mt-3 bg-black hover:bg-gray-800 text-white text-sm font-medium py-2 px-4 rounded-full">
                View Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedProduct;
