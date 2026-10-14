# 📚 LibroManía - Tienda de Libros Digital (Semana 7)

Aplicación web desarrollada en **React + Vite** que implementa un catálogo de libros interactivo, carrito de compras, pasarela de checkout con validaciones avanzadas, y personalización de temas (modo claro / modo oscuro) con animaciones dinámicas de ambiente.

Desarrollado por: **Henry Huayta Hinojosa**  
Carrera: **Ingeniería de Sistemas 2026**

---

## 🚀 Características y Apartados Principales

1. **📚 Catálogo de Libros (16 libros):**
   - Portadas con **perspectiva 3D y lomo realista** que reaccionan al pasar el cursor.
   - **Badges flotantes:** `🔥 Bestseller`, `⚡ -20% OFF`, `👑 Clásico`, `✨ Novedad`.
   - Precios originales con descuento tachado.
   - **Buscador en tiempo real** por título o autor con botón de limpieza rápida (`✕`).
   - Filtros dinámicos por categoría (*Novela, Clásico, Ciencia Ficción, Tecnología, Thriller, Fantasía, No Ficción*).
   - **Paginación dinámica:** Bloques de 8 en 8 libros con navegación `◀ Anterior`, números `[ 1 ] [ 2 ]` y `Siguiente ▶`.
   - Modal de alerta al agregar libros al carrito.

2. **🛒 Carrito de Compras:**
   - Contador de productos en tiempo real integrado en la navegación.
   - Controles para aumentar/disminuir cantidad (`+` / `-`).
   - Eliminación de productos y cálculo automático de subtotales y total general.

3. **💳 Proceso de Pago (Checkout):**
   - Formulario de datos con resumen del pedido en vivo.
   - **Validaciones avanzadas:**
     - Alerta roja visual en caso de campos vacíos.
     - Restricción en campo de teléfono: solo permite números.
     - Validación estricta en email: requiere `@`.
     - Resaltado de inputs con bordes rojos ante errores y foco automático mediante `useRef`.

4. **☀️/🌙 Modo Claro y Oscuro con Animación Ambiental:**
   - Botón toggle de tema en el Navbar gestionado con `useContext(ThemeContext)`.
   - **De Día (Modo Claro):** Lluvia suave de soles dorados flotantes (`☀️`, `✨`, `🔆`).
   - **De Noche (Modo Oscuro):** Lluvia suave de estrellas titilantes (`⭐`, `✨`, `🌟`).

---

## 🛠️ Cumplimiento de Requerimientos Técnicos (Semana 7)

| Paso | Concepto Clave | Implementación en el Código |
| :---: | :--- | :--- |
| **Paso 1** | `React.StrictMode` y `Profiler` | Configuración de `<Profiler id="Vista-..." onRender={onRenderProfile}>` en `App.jsx` y `StrictMode` en `main.jsx`. Sin usar `console.log` para medir rendimiento. |
| **Paso 2** | `useEffect` + `async/await` + `AbortController` | Implementado en el custom hook `useFetch.js` con array de dependencias y función de limpieza que cancela peticiones en curso para prevenir memory leaks. |
| **Paso 3** | `useContext` sin prop drilling | Separados por dominios: `ThemeContext.jsx` y `CartContext.jsx`. |
| **Paso 4** | Optimización de Renders (`useMemo`, `useCallback`, `useRef`) | `useMemo` para categorías, filtros y paginación; `useCallback` para estabilizar handlers; `useRef` para enfocar inputs sin disparar re-renderizados. |
| **Paso 5** | Custom Hooks | `useFetch.js` (gestión de peticiones) y `useForm.js` (validaciones y estado del formulario). |

---

## 📦 Instalación y Ejecución Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/HXava25/biblioteca_virtual.git

# 2. Entrar a la carpeta
cd biblioteca_virtual

# 3. Instalar dependencias
npm install

# 4. Iniciar servidor de desarrollo
npm run dev
```
