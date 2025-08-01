import React, {  useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import SideBar from "./ListeProduct/SideBar";
import ListeProducts from './ListeProduct/ListeProducts';
import { getProductByCategory } from '../../API/FetchProducts';

function ListeProductsLayout() {
      const [products, setProducts] = useState([]);
  const { state } = useLocation();
  const category = state?.category;
  useEffect(() => {
    getProductByCategory(category).then((res) => setProducts(res));
  })
  return (
    <div>
      <SideBar />
      
      <ListeProducts products={products} />
    </div>
  );
}

export default ListeProductsLayout;
