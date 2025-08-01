import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SellerPage from './pages/SellerPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth" element={<Auth />} /> */}

        { <Route path="/" element={<SellerPage />} />  }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
