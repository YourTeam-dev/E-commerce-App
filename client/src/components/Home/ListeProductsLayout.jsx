import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SideBar from "./ListeProduct/SideBar";
import ListeProducts from "./ListeProduct/ListeProducts";
import {
  getFiltredProduct,
  getProductByCategory,
} from "../../API/FetchProducts";

function ListeProductsLayout() {
  const [products, setProducts] = useState([]);
  const { state } = useLocation();
  const [filtred, setFiltred] = useState({
    category: state?.category || null,
  });
  useEffect(() => {
    if (state?.category) {
      setFiltred((prev) => ({
        category: state.category,
      }));
    }
  }, [state?.category]);
  useEffect(() => {
    getFiltredProduct(filtred).then((res) => setProducts(res));
  }, [filtred]);

  return (
    <div className="flex flex-col md:flex-row mx-4 ">
      <div className=" sticky top-0 ">
        <SideBar onFilterChange={setFiltred} filtred={filtred} />
      </div>
      <ListeProducts products={products} />
    </div>
  );
}

export default ListeProductsLayout;
