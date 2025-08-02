import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import Home from './pages/Home';
// import Comment from './components/productDetail/Comment';
// import Cart from './components/AddtoCard/Cart';
// import NavBar from './components/Home/Navbar';

import ProductListWithQuantity from './components/AddtoCard/Cart';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductListWithQuantity />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
