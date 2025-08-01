import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './components/AddtoCard/Cart';
function App() {
  return (
    <BrowserRouter>
      {/* <NavBar token={token} setToken={setToken} /> */}
      <Routes>
        {/* Uncomment or add more routes as needed */}
        {/* {!token && <Route path="/" element={<Navigate to="/signup" replace />} />}
        {token && <Route path="/" element={<Home />} />}
        {/* Add other routes here */}
        <Route path="/" element={<Cart  />} />

        {/* {!token && <Route path="/signup" element={<Signup setToken={setToken} />} />}
        {!token && <Route path="/login" element={<Login setToken={setToken} />} />} */}
        {/* <Route path="/*" element={<Home />} /> */}
        {/* <Route path="/auth" element={<Auth />} />  */}
        {/* <Route path="/products/:productId" element={<ProductDetail />} /> */}

        {/* For now, just show ProductDetail at root */}
       {/* <Route path="/" element={<Comment />} /> */}

        {/* Optional: catch all unmatched routes */}
        {/* <Route path="*" element={<NotFound />} /> */}
        {/* { <Route path="/" element={<SellerPage />} />  } */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
