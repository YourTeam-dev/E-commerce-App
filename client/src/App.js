import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/auth" element={<Auth />} />
        <Route path="/auth" element={<Auth />} /> */}

        {/* <Route path="*" element={<NotFound />} />  */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
