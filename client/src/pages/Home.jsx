import React from 'react'
import NavBar from '../components/Home/Navbar'
import { Route, Routes } from 'react-router-dom'
import MainLayout from '../components/Home/MainLayout'
import ListeProductsLayout from '../components/Home/ListeProductsLayout'
import Cart from '../components/AddtoCard/Cart';
import ProductDetails from './ProductDetails'

function Home() {
  return (
    <div>
        <NavBar token={token} setToken={setToken}/>
        <Routes>
          <Route path="" element={<MainLayout />} />
          <Route path="liste-products" element={<ListeProductsLayout />} />
          <Route path="cart" element={<Cart />} />
          <Route path="product/" element={<ProductDetails />} />
          {/* <Route path="profil" element={} /> */}
        </Routes>
    </div>
  )
}

export default Home
