import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

function Tema() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const [notification, setNotification] = useState(null);

  const handleThemeChange = (newTheme) => {
    toggleTheme(newTheme);
    const label = newTheme === 'light' ? 'Claro' : 'Oscuro';
    setNotification(`Tema cambiado a: ${label} (useContext aplicado)`);
  };

  return (
    <div style={{ padding: '30px', maxWidth: '700px', margin: '0 auto' }}>
      {/* Modal de notificación */}
      {notification && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2000,
          }}
        >
          <div
            style={{
              background: isDark ? '#1a1a2e' : '#fff',
              borderRadius: '20px',
              padding: '32px 40px',
              textAlign: 'center',
              boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
              maxWidth: '420px',
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🎨</div>
            <p
              style={{
                color: isDark ? '#e0e0e0' : '#333',
                fontSize: '1rem',
                marginBottom: '20px',
              }}
            >
              {notification}
            </p>
            <button
              onClick={() => setNotification(null)}
              style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 36px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1rem',
              }}
            >
              Aceptar
            </button>
          </div>
        </div>
      )}

      <h2
        style={{
          color: isDark ? '#667eea' : '#764ba2',
          fontSize: '2rem',
          marginBottom: '8px',
        }}
      >
        🎨 Personalización
      </h2>
      <p
        style={{
          color: isDark ? '#aaa' : '#666',
          marginBottom: '28px',
        }}
      >
        Ajusta la apariencia de la aplicación a tu gusto
      </p>

      {/* Tarjeta de tema */}
      <div
        style={{
          background: isDark ? '#1a1a2e' : '#fff',
          borderRadius: '16px',
          padding: '30px',
          boxShadow: isDark
            ? '0 4px 16px rgba(0,0,0,0.4)'
            : '0 4px 16px rgba(0,0,0,0.08)',
          marginBottom: '24px',
        }}
      >
        <h3
          style={{
            margin: '0 0 20px',
            color: isDark ? '#e0e0e0' : '#333',
            fontSize: '1.2rem',
          }}
        >
          Tema de la aplicación
        </h3>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '28px' }}>
          {/* Opción Claro */}
          <div
            onClick={() => handleThemeChange('light')}
            style={{
              flex: 1,
              padding: '24px',
              borderRadius: '14px',
              border:
                theme === 'light'
                  ? '3px solid #764ba2'
                  : isDark
                  ? '2px solid #333'
                  : '2px solid #e0e0e0',
              background: '#f8f8f8',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.3s',
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>☀️</div>
            <span
              style={{
                fontWeight: theme === 'light' ? 'bold' : 'normal',
                color: '#333',
                fontSize: '1rem',
              }}
            >
              Claro
            </span>
            {theme === 'light' && (
              <div
                style={{
                  marginTop: '8px',
                  color: '#764ba2',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                }}
              >
                ✓ Activo
              </div>
            )}
          </div>

          {/* Opción Oscuro */}
          <div
            onClick={() => handleThemeChange('dark')}
            style={{
              flex: 1,
              padding: '24px',
              borderRadius: '14px',
              border:
                theme === 'dark'
                  ? '3px solid #667eea'
                  : isDark
                  ? '2px solid #333'
                  : '2px solid #e0e0e0',
              background: '#1a1a2e',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.3s',
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🌙</div>
            <span
              style={{
                fontWeight: theme === 'dark' ? 'bold' : 'normal',
                color: '#e0e0e0',
                fontSize: '1rem',
              }}
            >
              Oscuro
            </span>
            {theme === 'dark' && (
              <div
                style={{
                  marginTop: '8px',
                  color: '#667eea',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                }}
              >
                ✓ Activo
              </div>
            )}
          </div>
        </div>

        {/* Info del Hook */}
        <div
          style={{
            background: isDark ? '#0f0f23' : '#f5f0ff',
            borderRadius: '12px',
            padding: '16px 20px',
            borderLeft: `4px solid ${isDark ? '#667eea' : '#764ba2'}`,
          }}
        >
          <p
            style={{
              margin: 0,
              color: isDark ? '#bbb' : '#555',
              fontSize: '0.9rem',
            }}
          >
            <strong>Hook usado:</strong> useContext con ThemeContext
          </p>
        </div>
      </div>

      {/* Previsualización */}
      <div
        style={{
          background: isDark ? '#1a1a2e' : '#fff',
          borderRadius: '16px',
          padding: '30px',
          boxShadow: isDark
            ? '0 4px 16px rgba(0,0,0,0.4)'
            : '0 4px 16px rgba(0,0,0,0.08)',
        }}
      >
        <h3
          style={{
            margin: '0 0 16px',
            color: isDark ? '#e0e0e0' : '#333',
            fontSize: '1.2rem',
          }}
        >
          Vista previa
        </h3>
        <div
          style={{
            background: isDark ? '#0f0f23' : '#fafafa',
            borderRadius: '12px',
            padding: '20px',
            border: isDark ? '1px solid #333' : '1px solid #eee',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '12px',
              marginBottom: '14px',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: isDark
                  ? 'linear-gradient(135deg, #667eea, #764ba2)'
                  : 'linear-gradient(135deg, #764ba2, #667eea)',
              }}
            />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  height: '10px',
                  borderRadius: '5px',
                  background: isDark ? '#2d2d5e' : '#e0d6f0',
                  marginBottom: '6px',
                  width: '60%',
                }}
              />
              <div
                style={{
                  height: '10px',
                  borderRadius: '5px',
                  background: isDark ? '#222' : '#f0e6ff',
                  width: '80%',
                }}
              />
            </div>
          </div>
          <p
            style={{
              margin: 0,
              color: isDark ? '#888' : '#999',
              fontSize: '0.85rem',
              textAlign: 'center',
            }}
          >
            Tema actual: <strong>{theme === 'light' ? 'Claro ☀️' : 'Oscuro 🌙'}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Tema;

