import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Comment from './pages/ProductDetails';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Uncomment or add more routes as needed */}
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/auth" element={<Auth />} /> */}
        {/* <Route path="/products/:productId" element={<ProductDetail />} /> */}

        {/* For now, just show ProductDetail at root */}
       <Route path="/" element={<Comment />} />

        {/* Optional: catch all unmatched routes */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
