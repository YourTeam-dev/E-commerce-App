import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SellerPage from './pages/SellerPage';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Home from './pages/Home';
import Comment from './components/productDetail/Comment';
import Cart from './components/AddtoCard/Cart'



function App() {
  const [token, setToken] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        {/* Uncomment or add more routes as needed */}
        {/* {!token && <Route path="/" element={<Navigate to="/signup" replace />} />}
        {token && <Route path="/" element={<Home />} />}
        <Route path="/cart" element={<Cart />} />
        {/* Add other routes here */}

        {/* {!token && <Route path="/signup" element={<Signup setToken={setToken} />} />}
        {!token && <Route path="/login" element={<Login setToken={setToken} />} />} */}
        <Route path="/*" element={<Home />} />
        {/* <Route path="/auth" element={<Auth />} />  */}
        {/* <Route path="/products/:productId" element={<ProductDetail />} />

        {/* For now, just show ProductDetail at root */}
       {/* <Route path="/" element={<Comment />} /> */}

        {/* Optional: catch all unmatched routes */}
        {/* <Route path="*" element={<NotFound />} /> */}
        { <Route path="/" element={<SellerPage />} />  }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
