import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { CreativePortfolio } from './pages/CreativePortfolio';
import { CustomCursor } from './components/CustomCursor';

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('roko-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  return (
    <BrowserRouter>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/creative" element={<CreativePortfolio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
