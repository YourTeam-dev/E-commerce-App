import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SellerDashboard from './pages/SellerPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home/*" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
