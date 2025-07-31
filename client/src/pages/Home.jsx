import React from 'react'
import NavBar from '../components/Home/Navbar'
import { Route, Routes } from 'react-router-dom'
import MainLayout from '../components/Home/MainLayout'
function Home() {
  return (
    <div>
        <NavBar/>
        <Routes>
          <Route path="/" element={<MainLayout />} />
          {/* <Route path="/products" element={<ListeProductsLayout />} /> */}
        </Routes>
    </div>
  )
}

export default Home
