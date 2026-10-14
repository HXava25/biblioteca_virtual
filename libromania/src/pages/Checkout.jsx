import { useState, useCallback, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import useForm from '../hooks/useForm';

function Checkout({ setCurrentPage }) {
  const { theme } = useTheme();
  const { cartItems, totalPrice, totalItems, clearCart } = useCart();
  const isDark = theme === 'dark';

  const [showConfirm, setShowConfirm] = useState(false);

  // Paso 4: useRef para enfocar el primer input con error sin provocar re-renders
  const nombreInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const direccionInputRef = useRef(null);
  const telefonoInputRef = useRef(null);

  // Función validadora pasada al custom hook useForm
  const validateOrder = useCallback((values) => {
    const errors = {};
    const errorMessages = [];

    if (!values.nombre.trim()) {
      errors.nombre = true;
      errorMessages.push('El nombre es obligatorio');
    }
    if (!values.email.trim()) {
      errors.email = true;
      errorMessages.push('El email es obligatorio');
    } else if (!values.email.includes('@')) {
      errors.email = true;
      errorMessages.push('El email debe contener un @');
    }
    if (!values.direccion.trim()) {
      errors.direccion = true;
      errorMessages.push('La dirección es obligatoria');
    }
    if (values.telefono && !/^\d[\d\s]*$/.test(values.telefono)) {
      errors.telefono = true;
      errorMessages.push('El teléfono solo debe contener números');
    }

    return {
      errors,
      summaryMessage:
        errorMessages.length === 1
          ? errorMessages[0]
          : '⚠️ Complete los campos obligatorios correctamente',
    };
  }, []);

  // Paso 5: Custom Hook useForm
  const {
    values: formData,
    fieldErrors,
    formError: errorAlert,
    setFormError: setErrorAlert,
    handleChange,
    setFieldValue,
    resetForm,
    handleSubmit: handleFormSubmit,
  } = useForm(
    {
      nombre: '',
      email: '',
      telefono: '',
      direccion: '',
      ciudad: '',
      metodo: 'tarjeta',
    },
    validateOrder
  );

  const onSubmit = (e) => {
    e.preventDefault();

    if (totalItems === 0) {
      setErrorAlert('Tu carrito está vacío. Agrega libros antes de proceder.');
      return;
    }

    const isValid = handleFormSubmit(e, () => {
      setShowConfirm(true);
      clearCart();
    });

    // Si hubo error, usamos useRef para enfocar el primer campo con error (Paso 4)
    if (!isValid) {
      if (!formData.nombre.trim() && nombreInputRef.current) {
        nombreInputRef.current.focus();
      } else if ((!formData.email.trim() || !formData.email.includes('@')) && emailInputRef.current) {
        emailInputRef.current.focus();
      } else if (!formData.direccion.trim() && direccionInputRef.current) {
        direccionInputRef.current.focus();
      } else if (formData.telefono && !/^\d[\d\s]*$/.test(formData.telefono) && telefonoInputRef.current) {
        telefonoInputRef.current.focus();
      }
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '12px',
    border: isDark ? '2px solid #333' : '2px solid #e0e0e0',
    background: isDark ? '#0f0f23' : '#fafafa',
    color: isDark ? '#e0e0e0' : '#333',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '6px',
    fontWeight: '600',
    color: isDark ? '#ccc' : '#444',
    fontSize: '0.9rem',
  };

  if (showConfirm) {
    return (
      <div
        style={{
          padding: '60px 30px',
          textAlign: 'center',
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        <div style={{ fontSize: '5rem', marginBottom: '16px' }}>🎉</div>
        <h2
          style={{
            color: isDark ? '#667eea' : '#764ba2',
            marginBottom: '12px',
            fontSize: '2rem',
          }}
        >
          ¡Compra Exitosa!
        </h2>
        <p
          style={{
            color: isDark ? '#aaa' : '#666',
            marginBottom: '10px',
            fontSize: '1.1rem',
          }}
        >
          Gracias por tu compra, <strong>{formData.nombre}</strong>.
        </p>
        <p
          style={{
            color: isDark ? '#888' : '#999',
            marginBottom: '30px',
          }}
        >
          Recibirás un correo de confirmación en <strong>{formData.email}</strong>
        </p>
        <button
          onClick={() => {
            setShowConfirm(false);
            setCurrentPage('catalogo');
          }}
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
          📚 Seguir Comprando
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '30px', maxWidth: '700px', margin: '0 auto' }}>
      <h2
        style={{
          color: isDark ? '#667eea' : '#764ba2',
          fontSize: '2rem',
          marginBottom: '8px',
        }}
      >
        💳 Finalizar Compra
      </h2>
      <p
        style={{
          color: isDark ? '#aaa' : '#666',
          marginBottom: '28px',
        }}
      >
        Completa tus datos para procesar el pedido
      </p>

      {/* Resumen del pedido */}
      {totalItems > 0 && (
        <div
          style={{
            background: isDark ? '#1a1a2e' : '#f8f4ff',
            borderRadius: '14px',
            padding: '18px 22px',
            marginBottom: '28px',
            border: isDark ? '1px solid #2d2d5e' : '1px solid #e8dff5',
          }}
        >
          <h4
            style={{
              margin: '0 0 10px',
              color: isDark ? '#a78bfa' : '#764ba2',
            }}
          >
            📦 Resumen del pedido
          </h4>
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                color: isDark ? '#bbb' : '#555',
                fontSize: '0.9rem',
                marginBottom: '4px',
              }}
            >
              <span>
                {item.title} x{item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <hr
            style={{
              border: 'none',
              borderTop: isDark ? '1px solid #333' : '1px solid #ddd',
              margin: '10px 0',
            }}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              color: isDark ? '#667eea' : '#764ba2',
            }}
          >
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      )}

      {/* Formulario */}

      {/* Alerta de error roja */}
      {errorAlert && (
        <div
          style={{
            background: isDark ? '#2e1a1a' : '#fff5f5',
            border: '2px solid #e74c3c',
            borderRadius: '14px',
            padding: '16px 22px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            animation: 'fadeIn 0.3s ease',
          }}
        >
          <span style={{ fontSize: '1.5rem' }}>❌</span>
          <p
            style={{
              flex: 1,
              margin: 0,
              color: '#e74c3c',
              fontWeight: 'bold',
              fontSize: '0.95rem',
            }}
          >
            {errorAlert}
          </p>
          <button
            onClick={() => setErrorAlert(null)}
            style={{
              background: '#e74c3c',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '6px 14px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '0.8rem',
            }}
          >
            ✕
          </button>
        </div>
      )}

      <form
        onSubmit={onSubmit}
        style={{
          background: isDark ? '#1a1a2e' : '#fff',
          borderRadius: '16px',
          padding: '30px',
          boxShadow: isDark
            ? '0 4px 16px rgba(0,0,0,0.4)'
            : '0 4px 16px rgba(0,0,0,0.08)',
        }}
      >
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Nombre completo *</label>
          <input
            ref={nombreInputRef}
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Juan Pérez García"
            style={{
              ...inputStyle,
              borderColor: fieldErrors.nombre ? '#e74c3c' : inputStyle.border.split(' ').pop(),
              border: fieldErrors.nombre
                ? '2px solid #e74c3c'
                : inputStyle.border,
            }}
            onFocus={(e) =>
              (e.target.style.borderColor = isDark ? '#667eea' : '#764ba2')
            }
            onBlur={(e) =>
              (e.target.style.borderColor = isDark ? '#333' : '#e0e0e0')
            }
          />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginBottom: '20px',
          }}
        >
          <div>
            <label style={labelStyle}>Email *</label>
            <input
              ref={emailInputRef}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              style={{
                ...inputStyle,
                border: fieldErrors.email
                  ? '2px solid #e74c3c'
                  : inputStyle.border,
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = isDark ? '#667eea' : '#764ba2')
              }
              onBlur={(e) =>
                (e.target.style.borderColor = fieldErrors.email ? '#e74c3c' : isDark ? '#333' : '#e0e0e0')
              }
            />
            {fieldErrors.email && (
              <p style={{ color: '#e74c3c', fontSize: '0.8rem', margin: '4px 0 0', fontWeight: '600' }}>
                El email debe contener un @ válido
              </p>
            )}
          </div>
          <div>
            <label style={labelStyle}>Teléfono (solo números)</label>
            <input
              ref={telefonoInputRef}
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="55 1234 5678"
              style={{
                ...inputStyle,
                border: fieldErrors.telefono
                  ? '2px solid #e74c3c'
                  : inputStyle.border,
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = isDark ? '#667eea' : '#764ba2')
              }
              onBlur={(e) =>
                (e.target.style.borderColor = fieldErrors.telefono ? '#e74c3c' : isDark ? '#333' : '#e0e0e0')
              }
            />
            {fieldErrors.telefono && (
              <p style={{ color: '#e74c3c', fontSize: '0.8rem', margin: '4px 0 0', fontWeight: '600' }}>
                Solo se permiten números
              </p>
            )}
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Dirección de envío *</label>
          <textarea
            ref={direccionInputRef}
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            placeholder="Calle, número, colonia, CP..."
            rows={3}
            style={{
              ...inputStyle,
              resize: 'vertical',
              border: fieldErrors.direccion
                ? '2px solid #e74c3c'
                : inputStyle.border,
            }}
            onFocus={(e) =>
              (e.target.style.borderColor = isDark ? '#667eea' : '#764ba2')
            }
            onBlur={(e) =>
              (e.target.style.borderColor = fieldErrors.direccion ? '#e74c3c' : isDark ? '#333' : '#e0e0e0')
            }
          />
          {fieldErrors.direccion && (
            <p style={{ color: '#e74c3c', fontSize: '0.8rem', margin: '4px 0 0', fontWeight: '600' }}>
              La dirección es obligatoria
            </p>
          )}
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={labelStyle}>Ciudad</label>
          <input
            type="text"
            name="ciudad"
            value={formData.ciudad}
            onChange={handleChange}
            placeholder="Ciudad de México"
            style={inputStyle}
            onFocus={(e) =>
              (e.target.style.borderColor = isDark ? '#667eea' : '#764ba2')
            }
            onBlur={(e) =>
              (e.target.style.borderColor = isDark ? '#333' : '#e0e0e0')
            }
          />
        </div>

        <div style={{ marginBottom: '28px' }}>
          <label style={labelStyle}>Método de pago</label>
          <div style={{ display: 'flex', gap: '12px' }}>
            {[
              { value: 'tarjeta', label: '💳 Tarjeta' },
              { value: 'paypal', label: '🅿️ PayPal' },
              { value: 'transferencia', label: '🏦 Transferencia' },
            ].map((method) => (
              <button
                type="button"
                key={method.value}
                onClick={() => setFieldValue('metodo', method.value)}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '12px',
                  border:
                    formData.metodo === method.value
                      ? `2px solid ${isDark ? '#667eea' : '#764ba2'}`
                      : isDark
                      ? '2px solid #333'
                      : '2px solid #e0e0e0',
                  background:
                    formData.metodo === method.value
                      ? isDark
                        ? '#1e1e4a'
                        : '#f0e6ff'
                      : 'transparent',
                  color: isDark ? '#e0e0e0' : '#333',
                  cursor: 'pointer',
                  fontWeight:
                    formData.metodo === method.value ? 'bold' : 'normal',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s',
                }}
              >
                {method.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
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
          ✅ Procesar Pago
        </button>
      </form>
    </div>
  );
}

export default Checkout;

