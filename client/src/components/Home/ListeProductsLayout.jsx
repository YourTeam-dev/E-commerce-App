import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SideBar from "./ListeProduct/SideBar";
import ListeProducts from "./ListeProduct/ListeProducts";
import { getProductByCategory } from "../../API/FetchProducts";

function ListeProductsLayout() {
  const [products, setProducts] = useState([]);
  const { state } = useLocation();
  const category = state?.category;
  console.log("Category from state:", category);
  useEffect(() => {
    getProductByCategory(category).then((res) => setProducts(res));
  }, [category]);

  return (
    <div className="flex flex-col md:flex-row mx-4 ">
      <div className=" sticky top-0 ">
        <SideBar category={category} />
      </div>
      <ListeProducts products={products} />
    </div>
  );
}

export default ListeProductsLayout;
