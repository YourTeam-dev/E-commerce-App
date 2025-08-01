import React from 'react'
import NavBar from '../components/Home/Navbar'
import { Route, Routes } from 'react-router-dom'
import MainLayout from '../components/Home/MainLayout'
import ListeProductsLayout from '../components/Home/ListeProductsLayout'
import Cart from '../components/AddtoCard/Cart';

function Home() {
  return (
    <div>
        <NavBar/>
        <Routes>
          <Route path="" element={<MainLayout />} />
          <Route path="liste-prodcuts" element={<ListeProductsLayout />} />
          <Cart/>
        </Routes>
    </div>
  )
}

export default Home
