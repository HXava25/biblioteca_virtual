import { useState, Profiler } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AmbientParticles from './components/AmbientParticles';
import Catalogo from './pages/Catalogo';
import Carrito from './pages/Carrito';
import Checkout from './pages/Checkout';

/**
 * Paso 1: Configurar Profiler de React para inspeccionar el ciclo de renderizado.
 * NOTA TÉCNICA: No usar console.log para medir rendimiento; Profiler de React mide
 * con precisión milimétrica la duración del renderizado y si fue por mount o update.
 */
function onRenderProfile(id, phase, actualDuration, baseDuration, startTime, commitTime) {
  // Almacenamos métricas en window para inspección del Profiler/DevTools
  if (typeof window !== 'undefined') {
    window.__PROFILER_METRICS__ = window.__PROFILER_METRICS__ || [];
    window.__PROFILER_METRICS__.push({
      id,
      phase,
      actualDuration: Number(actualDuration.toFixed(2)),
      baseDuration: Number(baseDuration.toFixed(2)),
      commitTime: Number(commitTime.toFixed(2)),
    });
  }
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState('catalogo');
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  const renderPage = () => {
    switch (currentPage) {
      case 'catalogo':
        return <Catalogo />;
      case 'carrito':
        return <Carrito setCurrentPage={setCurrentPage} />;
      case 'checkout':
        return <Checkout setCurrentPage={setCurrentPage} />;
      default:
        return <Catalogo />;
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        background: isDark
          ? 'linear-gradient(180deg, #0a0a1a 0%, #0f0f23 100%)'
          : 'linear-gradient(180deg, #f5f0ff 0%, #ede7f6 100%)',
        transition: 'background 0.4s ease',
        fontFamily: "'Segoe UI', 'Roboto', sans-serif",
      }}
    >
      {/* Fondo dinámico: soles de día / estrellas de noche */}
      <AmbientParticles />

      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <Profiler id={`Vista-${currentPage}`} onRender={onRenderProfile}>
          {renderPage()}
        </Profiler>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
