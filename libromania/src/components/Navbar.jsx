import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

function Navbar({ currentPage, setCurrentPage }) {
  const { theme, toggleTheme } = useTheme();
  const { totalItems } = useCart();

  const isDark = theme === 'dark';

  return (
    <>
      {/* Barra superior */}
      <div
        style={{
          background: isDark
            ? 'linear-gradient(135deg, #1a1a2e, #16213e)'
            : 'linear-gradient(135deg, #667eea, #764ba2)',
          color: '#fff',
          padding: '10px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '1.1rem',
          fontWeight: 'bold',
        }}
      >
        <span>📚 LibroManía - Tu Librería Digital</span>
        <button
          onClick={() => window.close()}
          style={{
            background: '#e74c3c',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            padding: '6px 16px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '0.9rem',
          }}
        >
          ✕ Cerrar
        </button>
      </div>

      {/* Navegación */}
      <nav
        style={{
          background: isDark ? '#0f0f23' : '#ffffff',
          padding: '12px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: isDark ? '2px solid #333' : '2px solid #eee',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}
      >
        <span
          style={{
            fontSize: '1.3rem',
            fontWeight: 'bold',
            color: isDark ? '#667eea' : '#764ba2',
            cursor: 'pointer',
          }}
          onClick={() => setCurrentPage('catalogo')}
        >
          📖 LibroManía
        </span>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {[
            { key: 'catalogo', label: '📚 Catálogo' },
            { key: 'carrito', label: `🛒 Carrito (${totalItems})` },
            { key: 'checkout', label: '💳 Checkout' },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setCurrentPage(item.key)}
              style={{
                background:
                  currentPage === item.key
                    ? isDark
                      ? '#667eea'
                      : '#764ba2'
                    : 'transparent',
                color:
                  currentPage === item.key
                    ? '#fff'
                    : isDark
                    ? '#ccc'
                    : '#333',
                border:
                  currentPage === item.key
                    ? 'none'
                    : isDark
                    ? '1px solid #444'
                    : '1px solid #ddd',
                borderRadius: '20px',
                padding: '8px 18px',
                cursor: 'pointer',
                fontWeight: currentPage === item.key ? 'bold' : 'normal',
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
              }}
            >
              {item.label}
            </button>
          ))}

          {/* Divisor estético */}
          <span
            style={{
              height: '24px',
              width: '1px',
              background: isDark ? '#333' : '#e0e0e0',
              margin: '0 4px',
            }}
          />

          {/* Botón toggle de tema */}
          <button
            onClick={() => toggleTheme()}
            title={`Cambiar a modo ${isDark ? 'claro' : 'oscuro'}`}
            style={{
              background: isDark
                ? 'linear-gradient(135deg, #2d2d5e, #1a1a3a)'
                : 'linear-gradient(135deg, #f0e6ff, #f9f5ff)',
              color: isDark ? '#ffd700' : '#764ba2',
              border: isDark ? '1px solid #444' : '1px solid #dcd0f0',
              borderRadius: '20px',
              padding: '8px 16px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.3s ease',
              boxShadow: isDark
                ? '0 2px 8px rgba(0,0,0,0.3)'
                : '0 2px 8px rgba(118,75,162,0.1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span>{isDark ? '🌙' : '☀️'}</span>
            <span>{isDark ? 'Oscuro' : 'Claro'}</span>
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

