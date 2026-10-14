import { useState, useEffect } from 'react';

/**
 * Hook personalizado useFetch (Paso 2 y Paso 5)
 * 
 * NOTA TÉCNICA:
 * En React StrictMode (dev), los efectos con [] se ejecutan 2 veces (mount -> unmount -> mount)
 * para detectar efectos secundarios sin función de limpieza (memory leaks).
 * Por ello, [] no significa estrictamente "se ejecuta solo una vez en dev".
 * AbortController cancela la solicitud anterior en la función de limpieza (cleanup).
 */
export function useFetch(url, initialData = null) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. Instanciamos AbortController para cancelar peticiones pendientes si el componente se desmonta
    const controller = new AbortController();
    const { signal } = controller;

    // 2. Función asíncrona con async/await (migración de .then())
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url, { signal });
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Error al obtener los datos');
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // 3. Función de limpieza que aborta la petición en curso para evitar memory leaks
    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, loading, error, setData };
}

export default useFetch;

