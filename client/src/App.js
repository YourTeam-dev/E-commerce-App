import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Home from './pages/Home';

function App() {
  const [token, setToken] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        {!token && <Route path="/" element={<Navigate to="/signup" replace />} />}
        {!token && <Route path="/signup" element={<Signup setToken={setToken} />} />}
        {!token && <Route path="/login" element={<Login setToken={setToken} />} />}
        {token && <Route path="/" element={<Home />} />}
        {/* Add other routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
