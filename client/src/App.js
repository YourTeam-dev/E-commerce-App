import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Comment from './components/productDetail/Comment';
import Cart from './components/AddtoCard/Cart';
import NavBar from './components/Home/Navbar';

function App() {
  return (
    <BrowserRouter>
<<<<<<< HEAD
=======
      {/* <NavBar token={token} setToken={setToken} /> */}
>>>>>>> 834231a1c843f73e9fcb67ebc23c3fcd7fbd71e9
      <Routes>
        {/* Uncomment or add more routes as needed */}
        {/* {/* {!token && <Route path="/" element={<Navigate to="/signup" replace />} />} */}
        {/* {token && <Route path="/" element={<Home />} />} */}
        {/* Add other routes here */}

        {/* {!token && <Route path="/signup" element={<Signup setToken={setToken} />} />}
        {!token && <Route path="/login" element={<Login setToken={setToken} />} />} */}
        <Route path="/*" element={<Home token={token} setToken={setToken} />} />
        {/* <Route path="/auth" element={<Auth />} />  */}
        {/* <Route path="/products/:productId" element={<ProductDetail />} /> */}

        {/* For now, just show ProductDetail at root */}
       {/* <Route path="/" element={<ProductDetails />} />  */}

        {/* Optional: catch all unmatched routes */}
        {/* <Route path="*" element={<NotFound />} /> */}
        {/* { <Route path="/" element={<SellerPage />} />  } */}
        {/* { <Route path="/" element={<SellerPage />} />  } */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
