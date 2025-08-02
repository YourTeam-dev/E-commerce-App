import React from 'react'
import NavBar from '../components/Home/Navbar'
import { Route, Routes } from 'react-router-dom'
import MainLayout from '../components/Home/MainLayout'
import ListeProductsLayout from '../components/Home/ListeProductsLayout'
function Home({token, setToken}) {
  return (
    <div>
        <NavBar token={token} setToken={setToken}/>
        <Routes>
          <Route path="" element={<MainLayout />} />
          <Route path="liste-prodcuts" element={<ListeProductsLayout />} />
        </Routes>
    </div>
  )
}

export default Home
