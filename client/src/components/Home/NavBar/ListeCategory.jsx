import React from 'react'
import { useNavigate } from 'react-router-dom';

function ListeCategory({categories, setShowCategory}) {
    const navigate = useNavigate();
  return (
        <div className="absolute top-[105%] left-0 w-full bg-white shadow-md py-1 border-t border-gray-200 px-6 flex items-center justify-between">
          <div className="flex-grow px-6">
            <ul className="flex flex-wrap">
              {categories.map((category) => (
                <li
                  key={category._id}
                  className="text-center w-1/6  hover:border-l hover:border-r border-[#d58a94]"
                >
                  <a
                    onClick={() => {
                      setShowCategory(false);
                      navigate(`/liste-products`, {
                        state: { category: category._id },
                      });
                    }}
                    className="text-gray-700 hover:text-[#d58a94] transition"
                  >
                    {category.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
  )
}

export default ListeCategory
