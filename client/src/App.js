import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth" element={<Auth />} />

        {/* <Route path="*" element={<NotFound />} />  */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
