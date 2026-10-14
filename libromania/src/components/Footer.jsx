import { useTheme } from '../context/ThemeContext';

function Footer() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <footer
      style={{
        marginTop: '60px',
        borderTop: isDark ? '1px solid #252545' : '1px solid #e6dff2',
        background: isDark
          ? 'linear-gradient(180deg, #0d0d1e 0%, #070714 100%)'
          : 'linear-gradient(180deg, #f8f4ff 0%, #ece5f8 100%)',
        padding: '30px 24px',
        color: isDark ? '#a0a0c0' : '#605575',
        textAlign: 'center',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '8px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            color: isDark ? '#8b9cf5' : '#764ba2',
          }}
        >
          <span>📖 LibroManía</span>
          <span>•</span>
          <span>Tu Librería Digital</span>
        </div>

        <p
          style={{
            fontSize: '0.95rem',
            margin: '6px 0',
            fontWeight: '600',
            color: isDark ? '#e0e0f5' : '#33334d',
            letterSpacing: '0.3px',
          }}
        >
          Desarrollado por: <span style={{ color: isDark ? '#a78bfa' : '#764ba2' }}>Henry Huayta Hinojosa</span>
        </p>

        <p
          style={{
            fontSize: '0.85rem',
            margin: '4px 0 14px',
            color: isDark ? '#8888aa' : '#777799',
          }}
        >
          🎓 Ingeniería de Sistemas 2026 • Proyecto React
        </p>

        <div
          style={{
            fontSize: '0.78rem',
            color: isDark ? '#555577' : '#9999b3',
            borderTop: isDark ? '1px solid #1a1a33' : '1px solid #ddd5eb',
            paddingTop: '12px',
            maxWidth: '500px',
            margin: '0 auto',
          }}
        >
          © 2026 LibroManía. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

export default Footer;

