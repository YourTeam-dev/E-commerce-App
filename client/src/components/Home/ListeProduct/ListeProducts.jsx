import React, { use } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
import useCart from '../../../hooks/useCart';
function ListeProducts({ products }) {
  const navigate = useNavigate();
  const { addToCart }  = useCart();
  const handleAddToCart = (product) => {
    addToCart(product);
  };

  if (!products) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>No products found</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 my-3">
        {products.map((product, index) => {
          const hasPromo = product.promo > 0;
          const discountedPrice = hasPromo
            ? product.price * (1 - product.promo / 100)
            : product.price;

          return (
            <div
              key={index}
              className="bg-white shadow-lg rounded-2xl overflow-hidden transition-transform hover:scale-105"
            >
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 text-center text-black space-y-2">
                <h3 className="text-lg font-semibold">{product.title}</h3>

                {/* Price & Promo */}
                <div className="text-sm">
                  {hasPromo ? (
                    <div>
                      <span className="text-red-600 font-bold text-lg">
                        ${discountedPrice.toFixed(2)}
                      </span>{' '}
                      <span className="line-through text-gray-500">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="ml-2 text-green-600 font-medium">
                        -{product.promo}%
                      </span>
                    </div>
                  ) : (
                    <div className="text-gray-800 font-bold text-lg">
                      ${product.price.toFixed(2)}
                    </div>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex justify-center flex-row mt-3">
                  <button
                    onClick={() =>
                      navigate(`/product/`, {
                        state: { productId: product._id },
                      })
                    }
                    className="bg-black hover:shadow-lg text-white text-sm font-medium py-2 px-3 rounded-l-full"
                  >
                    View Product
                  </button>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-[#d58a94] hover:shadow-lg text-white text-sm font-medium py-2 px-3 rounded-r-full"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ListeProducts;
