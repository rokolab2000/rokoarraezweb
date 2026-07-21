import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CustomCursor } from './components/CustomCursor';

// Dynamic imports (Code-Splitting) to prevent loading heavy 3D/WebGL assets upfront
const Dashboard = lazy(() => import('./pages/Dashboard').then(m => ({ default: m.Dashboard })));
const CreativePortfolio = lazy(() => import('./pages/CreativePortfolio').then(m => ({ default: m.CreativePortfolio })));

const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--bg-base, #0a0a0f)', color: 'var(--text-muted, #888)' }}>
    <span>Cargando...</span>
  </div>
);

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('roko-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  return (
    <BrowserRouter>
      <CustomCursor />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/creative" element={<CreativePortfolio />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

