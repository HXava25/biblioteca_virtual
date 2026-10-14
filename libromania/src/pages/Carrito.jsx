import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

function Carrito({ setCurrentPage }) {
  const { theme } = useTheme();
  const { cartItems, removeFromCart, updateQuantity, totalPrice, totalItems } =
    useCart();

  const isDark = theme === 'dark';

  if (cartItems.length === 0) {
    return (
      <div
        style={{
          padding: '60px 30px',
          textAlign: 'center',
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        <div style={{ fontSize: '5rem', marginBottom: '16px' }}>🛒</div>
        <h2
          style={{
            color: isDark ? '#667eea' : '#764ba2',
            marginBottom: '12px',
          }}
        >
          Tu carrito está vacío
        </h2>
        <p style={{ color: isDark ? '#aaa' : '#888', marginBottom: '24px' }}>
          ¡Explora nuestro catálogo y encuentra libros increíbles!
        </p>
        <button
          onClick={() => setCurrentPage('catalogo')}
          style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            padding: '14px 32px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem',
          }}
        >
          📚 Ir al Catálogo
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '30px', maxWidth: '900px', margin: '0 auto' }}>
      <h2
        style={{
          color: isDark ? '#667eea' : '#764ba2',
          fontSize: '2rem',
          marginBottom: '8px',
        }}
      >
        🛒 Mi Carrito
      </h2>
      <p
        style={{
          color: isDark ? '#aaa' : '#666',
          marginBottom: '24px',
        }}
      >
        Tienes {totalItems} {totalItems === 1 ? 'libro' : 'libros'} en tu
        carrito
      </p>

      {/* Tabla/Lista de productos */}
      <div
        style={{
          background: isDark ? '#1a1a2e' : '#fff',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: isDark
            ? '0 4px 16px rgba(0,0,0,0.4)'
            : '0 4px 16px rgba(0,0,0,0.08)',
        }}
      >
        {cartItems.map((item, index) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '18px 24px',
              gap: '18px',
              borderBottom:
                index < cartItems.length - 1
                  ? isDark
                    ? '1px solid #2a2a4a'
                    : '1px solid #f0f0f0'
                  : 'none',
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: '70px',
                height: '90px',
                objectFit: 'cover',
                borderRadius: '10px',
              }}
            />
            <div style={{ flex: 1 }}>
              <h4
                style={{
                  margin: '0 0 4px',
                  color: isDark ? '#e0e0e0' : '#333',
                  fontSize: '1rem',
                }}
              >
                {item.title}
              </h4>
              <p
                style={{
                  margin: 0,
                  color: isDark ? '#888' : '#999',
                  fontSize: '0.85rem',
                }}
              >
                {item.author}
              </p>
            </div>

            {/* Controles de cantidad */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: 'none',
                  background: isDark ? '#2d2d5e' : '#f0e6ff',
                  color: isDark ? '#a78bfa' : '#764ba2',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                −
              </button>
              <span
                style={{
                  minWidth: '30px',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: isDark ? '#e0e0e0' : '#333',
                }}
              >
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: 'none',
                  background: isDark ? '#2d2d5e' : '#f0e6ff',
                  color: isDark ? '#a78bfa' : '#764ba2',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                +
              </button>
            </div>

            <span
              style={{
                fontWeight: 'bold',
                color: isDark ? '#667eea' : '#764ba2',
                fontSize: '1.1rem',
                minWidth: '90px',
                textAlign: 'right',
              }}
            >
              ${(item.price * item.quantity).toFixed(2)}
            </span>

            <button
              onClick={() => removeFromCart(item.id)}
              style={{
                background: '#ff4757',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 12px',
                cursor: 'pointer',
                fontSize: '0.85rem',
              }}
            >
              🗑️
            </button>
          </div>
        ))}
      </div>

      {/* Resumen */}
      <div
        style={{
          marginTop: '24px',
          background: isDark ? '#1a1a2e' : '#fff',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: isDark
            ? '0 4px 16px rgba(0,0,0,0.4)'
            : '0 4px 16px rgba(0,0,0,0.08)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '18px',
          }}
        >
          <span
            style={{
              fontSize: '1.3rem',
              fontWeight: 'bold',
              color: isDark ? '#e0e0e0' : '#333',
            }}
          >
            Total:
          </span>
          <span
            style={{
              fontSize: '1.8rem',
              fontWeight: 'bold',
              color: isDark ? '#667eea' : '#764ba2',
            }}
          >
            ${totalPrice.toFixed(2)}
          </span>
        </div>
        <button
          onClick={() => setCurrentPage('checkout')}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            padding: '16px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => (e.target.style.opacity = '0.9')}
          onMouseLeave={(e) => (e.target.style.opacity = '1')}
        >
          💳 Proceder al Checkout
        </button>
      </div>
    </div>
  );
}

export default Carrito;

