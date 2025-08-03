import React, { use, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import { getFiltredProduct } from "../../API/FetchProducts";
import { Loader } from "lucide-react";
function Search() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const wrapperRef = useRef(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debouncedSearch = useCallback(
    debounce((value) => {
      setLoading(true);
      sendSearchRequest(value);
    }, 500),
    []
  );

  const sendSearchRequest = (search) => {
    if (!search.trim()) {
      setLoading(false);
      setSearchOpen(false);
      setSearchResults([]);
      return;
    } else {
      getFiltredProduct({ search }).then((res) => {
        setSearchOpen(true);
        setLoading(false);
        setSearchResults(res.slice(0, 5));
      });
    }
  };
  useEffect(() => {
    if (searchResults.length > 0) {
      setSearchOpen(true);
    }
  }, [searchResults]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <div className="flex-grow px-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => {
            setSearchOpen(true);
            e.target.value.trim() && setLoading(true);
            setSearchTerm(e.target.value);
            debouncedSearch(e.target.value);
          }}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#d58a94]"
        />
      </div>
      {searchOpen && (
        <div className="absolute left-0 mt-2 w-full bg-white text-gray-800 rounded-md shadow-lg z-20">
          {loading ? (
            <div className="w-full  px-4 py-2  flex items-center justify-center space-x-2">
              <Loader className="animate-spin" />
            </div>
          ) : (
            searchResults &&
            (searchResults.length === 0 ? (
              <p className="text-center font-semibold sm:text-sm py-2">
                No results found ...
              </p>
            ) : (
              searchResults.map((product) => (
                <div
                  key={product._id}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 cursor-pointer"
                  onClick={() =>{
                    setSearchOpen(false);
                    setSearchTerm('');
                    navigate(`/product`, { state: { productId: product._id } })
                  } }
                >
                  <div className="relative">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-8 h-8 rounded-full"
                    />
                  </div>
                  <span className="text-sm text-gray-500 overflow-hidden">
                    {product.title}
                  </span>
                  <span className="text-xs text-gray-500 float-right">${product.price.toFixed(2)}</span>
                </div>
              ))
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
