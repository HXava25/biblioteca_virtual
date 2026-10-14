import { useState, useMemo, useCallback, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import useFetch from '../hooks/useFetch';
import fallbackBooks from '../data/books';

function Catalogo() {
  const { theme } = useTheme();
  const { addToCart } = useCart();
  const [notification, setNotification] = useState(null);
  const [filter, setFilter] = useState('Todos');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  // Paso 4: useRef para manipular directamente el DOM (input focus) sin provocar re-renders
  const searchInputRef = useRef(null);

  // Paso 2 y 5: useFetch con async/await y AbortController para side effects limpios
  const { data: fetchedBooks, loading } = useFetch('/api/books.json', fallbackBooks);
  const books = fetchedBooks || fallbackBooks;

  const isDark = theme === 'dark';

  // Paso 4: useMemo para categorías (evita recalculaciones innecesarias en cada render)
  const categories = useMemo(() => {
    return ['Todos', ...new Set(books.map((b) => b.category))];
  }, [books]);

  // Paso 4: useMemo para el filtrado pesado de libros y búsqueda
  const filteredBooks = useMemo(() => {
    return books.filter((b) => {
      const matchesCategory = filter === 'Todos' || b.category === filter;
      const matchesSearch =
        search.trim() === '' ||
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.author.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [books, filter, search]);

  // Paginación: 8 libros por página
  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE) || 1;

  const paginatedBooks = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return filteredBooks.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredBooks, page]);

  const handleFilterChange = (cat) => {
    setFilter(cat);
    setPage(1); // Regresa a la página 1 al cambiar de categoría
  };

  const handleSearchChange = (val) => {
    setSearch(val);
    setPage(1); // Regresa a la página 1 al escribir búsqueda
  };

  // Paso 4: useCallback para estabilizar callbacks pasados a eventos
  const handleAdd = useCallback(
    (book) => {
      addToCart(book);
      setNotification(`"${book.title}" agregado al carrito`);
    },
    [addToCart]
  );

  const handleClearSearch = useCallback(() => {
    setSearch('');
    setPage(1);
    // Paso 4: usar useRef para enfocar el input sin provocar renders
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const handleResetAll = useCallback(() => {
    setSearch('');
    setFilter('Todos');
    setPage(1);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const renderStars = useCallback((rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }, []);

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Alerta al agregar libro */}
      {notification && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.4)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2000,
          }}
          onClick={() => setNotification(null)}
        >
          <div
            style={{
              background: isDark ? '#1a2e1a' : '#fff',
              borderRadius: '20px',
              padding: '32px 40px',
              textAlign: 'center',
              boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
              maxWidth: '420px',
              border: '2px solid #2ecc71',
              animation: 'fadeIn 0.3s ease',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📖✅</div>
            <p
              style={{
                color: '#2ecc71',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                marginBottom: '6px',
              }}
            >
              ¡Libro agregado al carrito!
            </p>
            <p
              style={{
                color: isDark ? '#ccc' : '#555',
                fontSize: '0.95rem',
                marginBottom: '20px',
              }}
            >
              {notification}
            </p>
            <button
              onClick={() => setNotification(null)}
              style={{
                background: '#2ecc71',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                padding: '10px 32px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '0.95rem',
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
        📚 Catálogo de Libros
      </h2>
      <p
        style={{
          color: isDark ? '#aaa' : '#666',
          marginBottom: '24px',
          fontSize: '1rem',
        }}
      >
        Explora nuestra colección y encuentra tu próxima gran lectura
      </p>

      {/* Buscador */}
      <div
        style={{
          position: 'relative',
          marginBottom: '20px',
        }}
      >
        <span
          style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '1.2rem',
            color: isDark ? '#888' : '#aaa',
            pointerEvents: 'none',
          }}
        >
          🔍
        </span>
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Buscar por título o autor..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          style={{
            width: '100%',
            padding: '14px 16px 14px 48px',
            borderRadius: '14px',
            border: isDark ? '2px solid #333' : '2px solid #e0e0e0',
            background: isDark ? '#1a1a2e' : '#ffffff',
            color: isDark ? '#e0e0e0' : '#333',
            fontSize: '1rem',
            outline: 'none',
            transition: 'border-color 0.3s, box-shadow 0.3s',
            boxShadow: isDark
              ? '0 2px 8px rgba(0,0,0,0.2)'
              : '0 2px 8px rgba(0,0,0,0.05)',
            boxSizing: 'border-box',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = isDark ? '#667eea' : '#764ba2';
            e.target.style.boxShadow = isDark
              ? '0 0 0 3px rgba(102,126,234,0.2)'
              : '0 0 0 3px rgba(118,75,162,0.15)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = isDark ? '#333' : '#e0e0e0';
            e.target.style.boxShadow = isDark
              ? '0 2px 8px rgba(0,0,0,0.2)'
              : '0 2px 8px rgba(0,0,0,0.05)';
          }}
        />
        {search && (
          <button
            onClick={handleClearSearch}
            style={{
              position: 'absolute',
              right: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: isDark ? '#333' : '#e0e0e0',
              border: 'none',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              cursor: 'pointer',
              color: isDark ? '#aaa' : '#666',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Filtro por categoría */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '28px',
          flexWrap: 'wrap',
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleFilterChange(cat)}
            style={{
              padding: '8px 20px',
              borderRadius: '25px',
              border: 'none',
              background:
                filter === cat
                  ? 'linear-gradient(135deg, #667eea, #764ba2)'
                  : isDark
                  ? '#1e1e3a'
                  : '#f0f0f5',
              color: filter === cat ? '#fff' : isDark ? '#bbb' : '#555',
              cursor: 'pointer',
              fontWeight: filter === cat ? 'bold' : 'normal',
              transition: 'all 0.3s ease',
              fontSize: '0.85rem',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sin resultados */}
      {filteredBooks.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '50px 20px',
            color: isDark ? '#888' : '#999',
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📭</div>
          <p style={{ fontSize: '1.1rem', marginBottom: '8px' }}>
            No se encontraron libros para "<strong>{search}</strong>"
          </p>
          <p style={{ fontSize: '0.9rem' }}>
            Intenta con otro término o categoría
          </p>
          <button
            onClick={handleResetAll}
            style={{
              marginTop: '16px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              padding: '10px 24px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Limpiar búsqueda
          </button>
        </div>
      )}

      {/* Grid de libros */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '24px',
        }}
      >
        {paginatedBooks.map((book) => (
          <div
            key={book.id}
            style={{
              background: isDark ? '#1a1a2e' : '#ffffff',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: isDark
                ? '0 6px 20px rgba(0,0,0,0.45)'
                : '0 6px 20px rgba(0,0,0,0.08)',
              transition: 'all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              perspective: '1000px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = isDark
                ? '0 16px 36px rgba(102,126,234,0.35)'
                : '0 16px 36px rgba(118,75,162,0.22)';
              const imgEl = e.currentTarget.querySelector('.book-cover-img');
              if (imgEl) {
                imgEl.style.transform = 'scale(1.03) rotateY(-4deg)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = isDark
                ? '0 6px 20px rgba(0,0,0,0.45)'
                : '0 6px 20px rgba(0,0,0,0.08)';
              const imgEl = e.currentTarget.querySelector('.book-cover-img');
              if (imgEl) {
                imgEl.style.transform = 'scale(1) rotateY(0deg)';
              }
            }}
          >
            {/* Contenedor de la Portada con efecto 3D */}
            <div
              style={{
                position: 'relative',
                overflow: 'hidden',
                background: isDark ? '#121224' : '#f4effa',
                padding: '16px 16px 4px 16px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* Badge flotante */}
              {book.badge && (
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    zIndex: 2,
                    background:
                      book.badgeType === 'discount'
                        ? 'linear-gradient(135deg, #e74c3c, #c0392b)'
                        : book.badgeType === 'bestseller'
                        ? 'linear-gradient(135deg, #f39c12, #e67e22)'
                        : 'linear-gradient(135deg, #8e44ad, #667eea)',
                    color: '#fff',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    boxShadow: '0 3px 10px rgba(0,0,0,0.25)',
                    letterSpacing: '0.3px',
                  }}
                >
                  {book.badge}
                </div>
              )}

              {/* Libro 3D con lomo y sombra */}
              <div
                className="book-cover-img"
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '220px',
                  borderRadius: '6px 10px 10px 6px',
                  overflow: 'hidden',
                  boxShadow: isDark
                    ? '4px 8px 18px rgba(0,0,0,0.7), inset 3px 0 6px rgba(0,0,0,0.4)'
                    : '4px 8px 18px rgba(0,0,0,0.25), inset 3px 0 6px rgba(0,0,0,0.2)',
                  transition: 'transform 0.35s ease',
                  transformOrigin: 'left center',
                }}
              >
                <img
                  src={book.image}
                  alt={book.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                {/* Lomo / Brillo 3D del libro */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: '24px',
                    background:
                      'linear-gradient(90deg, rgba(0,0,0,0.38) 0%, rgba(255,255,255,0.25) 20%, rgba(0,0,0,0.12) 65%, transparent 100%)',
                    pointerEvents: 'none',
                  }}
                />
              </div>
            </div>

            <div style={{ padding: '16px 18px 18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div>
                <span
                  style={{
                    background: isDark ? '#2d2d5e' : '#f0e6ff',
                    color: isDark ? '#a78bfa' : '#764ba2',
                    padding: '3px 10px',
                    borderRadius: '10px',
                    fontSize: '0.72rem',
                    fontWeight: 'bold',
                  }}
                >
                  {book.category}
                </span>
              </div>
              <h3
                style={{
                  margin: '8px 0 3px',
                  color: isDark ? '#e0e0e0' : '#2c2c2c',
                  fontSize: '1.05rem',
                  lineHeight: '1.3',
                }}
              >
                {book.title}
              </h3>
              <p
                style={{
                  color: isDark ? '#888' : '#999',
                  fontSize: '0.82rem',
                  margin: '0 0 6px',
                }}
              >
                por {book.author}
              </p>
              <div
                style={{
                  color: '#f1c40f',
                  fontSize: '0.85rem',
                  marginBottom: '8px',
                }}
              >
                {renderStars(book.rating)}
              </div>
              <p
                style={{
                  color: isDark ? '#aaa' : '#777',
                  fontSize: '0.8rem',
                  lineHeight: '1.4',
                  marginBottom: '14px',
                  flex: 1,
                }}
              >
                {book.description}
              </p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 'auto',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <span
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        color: isDark ? '#667eea' : '#764ba2',
                      }}
                    >
                      ${book.price.toFixed(2)}
                    </span>
                    {book.originalPrice && (
                      <span
                        style={{
                          fontSize: '0.85rem',
                          color: isDark ? '#777' : '#999',
                          textDecoration: 'line-through',
                        }}
                      >
                        ${book.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleAdd(book)}
                  style={{
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '9px 16px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '0.85rem',
                    transition: 'all 0.2s',
                    boxShadow: '0 3px 8px rgba(118,75,162,0.25)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  🛒 Agregar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controles de Paginación */}
      {filteredBooks.length > ITEMS_PER_PAGE && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            marginTop: '40px',
            paddingTop: '20px',
            borderTop: isDark ? '1px solid #22223a' : '1px solid #eae2f5',
          }}
        >
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {/* Botón Anterior */}
            <button
              onClick={() => {
                setPage((prev) => Math.max(prev - 1, 1));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              disabled={page === 1}
              style={{
                padding: '8px 18px',
                borderRadius: '12px',
                border: isDark ? '1px solid #333' : '1px solid #ddd',
                background:
                  page === 1
                    ? isDark
                      ? '#121220'
                      : '#f0f0f5'
                    : isDark
                    ? '#1a1a2e'
                    : '#fff',
                color: page === 1 ? '#666' : isDark ? '#e0e0e0' : '#333',
                cursor: page === 1 ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                fontSize: '0.88rem',
                transition: 'all 0.2s',
                opacity: page === 1 ? 0.6 : 1,
              }}
            >
              ◀ Anterior
            </button>

            {/* Números de página */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => {
                  setPage(num);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  border: 'none',
                  background:
                    page === num
                      ? 'linear-gradient(135deg, #667eea, #764ba2)'
                      : isDark
                      ? '#1a1a2e'
                      : '#fff',
                  color: page === num ? '#fff' : isDark ? '#ccc' : '#444',
                  boxShadow:
                    page === num
                      ? '0 4px 12px rgba(118,75,162,0.35)'
                      : isDark
                      ? '0 2px 6px rgba(0,0,0,0.3)'
                      : '0 2px 6px rgba(0,0,0,0.06)',
                  cursor: 'pointer',
                  fontWeight: page === num ? 'bold' : 'normal',
                  fontSize: '0.95rem',
                  transition: 'all 0.25s',
                }}
              >
                {num}
              </button>
            ))}

            {/* Botón Siguiente */}
            <button
              onClick={() => {
                setPage((prev) => Math.min(prev + 1, totalPages));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              disabled={page === totalPages}
              style={{
                padding: '8px 18px',
                borderRadius: '12px',
                border: isDark ? '1px solid #333' : '1px solid #ddd',
                background:
                  page === totalPages
                    ? isDark
                      ? '#121220'
                      : '#f0f0f5'
                    : isDark
                    ? '#1a1a2e'
                    : '#fff',
                color: page === totalPages ? '#666' : isDark ? '#e0e0e0' : '#333',
                cursor: page === totalPages ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                fontSize: '0.88rem',
                transition: 'all 0.2s',
                opacity: page === totalPages ? 0.6 : 1,
              }}
            >
              Siguiente ▶
            </button>
          </div>

          <span
            style={{
              fontSize: '0.85rem',
              color: isDark ? '#888' : '#777',
            }}
          >
            Mostrando 8 de {filteredBooks.length} libros • Página {page} de {totalPages}
          </span>
        </div>
      )}
    </div>
  );
}

export default Catalogo;

