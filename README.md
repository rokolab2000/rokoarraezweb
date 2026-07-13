# ROKO — Creative Portfolio & Dashboard 🚀

Este repositorio contiene la aplicación web del portafolio interactivo de **ROKO (Product Designer)**. El proyecto ha evolucionado desde prototipos estáticos interactivos en HTML/CSS/JS tradicionales hasta convertirse en una aplicación de página única (SPA) moderna construida con **React, TypeScript y Vite**.

---

## 🛠️ Arquitectura Técnica y Stack

El proyecto utiliza un conjunto de herramientas modernas para lograr una experiencia fluida, interactiva y estéticamente premium:

- **Core**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vite.dev/)
- **Animaciones**: [GSAP (GreenSock Animation Platform)](https://gsap.com/) con plugins `ScrollTrigger` y `CustomEase` para transiciones avanzadas y micro-interacciones suaves.
- **Scroll**: [Lenis](https://lenis.darkroom.engineering/) para suavizar el desplazamiento vertical en todas las páginas.
- **Enrutamiento**: [React Router DOM v7](https://reactrouter.com/) para transiciones entre el Dashboard principal y el portafolio creativo.
- **Efectos Visuales**: Canvas 2D personalizado para fondos de partículas reactivas (`ParticleBackground.tsx`) y mezclas de mezcla CSS (exclusion) para el cursor dinámico (`CustomCursor.tsx`).

---

## ✨ Características Clave

1. **Diseño Adaptable y Temas (Light / Dark)**:
   - Control de temas mediante tokens CSS avanzados (`--bg-base`, `--text-primary`, `--purple`, etc.).
   - Persistencia de preferencias del usuario mediante `LocalStorage` para recordar el tema preferido (`roko-theme`).
2. **Cursor Interactivo Personalizado**:
   - Cursor personalizado que sigue el movimiento del ratón con un retraso (lerping) y reacciona al pasar sobre elementos interactivos (hacer clic, enlaces, proyectos) mediante efectos de mezcla visual.
3. **Efecto de Fondo de Partículas**:
   - Un fondo interactivo y sutil que reacciona levemente al movimiento y crea una sensación de profundidad.
4. **Desplazamiento Suave (Smooth Scrolling)**:
   - Integrado con Lenis para evitar el salto brusco del scroll nativo del navegador, mejorando la inercia y la fluidez de las animaciones de ScrollTrigger.
5. **Evolución y Versiones (Historial de Prototipos)**:
   - El proyecto incluye su historial de iteraciones directamente accesibles en la carpeta `public/`, documentando el proceso de diseño y refinamiento.

---

## 📈 Proceso de Diseño y Evolución (Historial de Archivos)

El desarrollo del sitio siguió un enfoque iterativo y de mejora continua, reflejado en los archivos de prototipo dentro de la carpeta `public/`:

- **`roko-portfolio.html` (V1)**:
  - Estructuración inicial del contenido del portafolio (Hero, Proyectos, Servicios, Contacto).
- **`roko-portfolio-2.html` (V2) & `roko-portfolio-3.html` (V3)**:
  - Adición y refinamiento del sistema de estilos. Introducción de los tokens de color CSS y primera aproximación al diseño responsivo.
- **`roko-portfolio-4.html` (V4)**:
  - Integración preliminar de animaciones con GSAP. Creación de transiciones de entrada y efectos hover interactivos en tarjetas de proyectos.
- **`roko-portfolio-5.html` (V5)**:
  - Implementación del cursor inteligente personalizado con efecto de mezcla CSS y optimización de efectos de scroll.
- **`roko-portfolio-6.html` (V6)**:
  - Versión definitiva del prototipo estático autónomo (Single File) que incluye el cargador previo (preloader), transiciones completas de tema oscuro/claro y la experiencia interactiva pulida.
- **`rokoarraezwebOD-app` (React SPA - Versión Actual)**:
  - Refactorización total de la lógica a componentes de React reutilizables.
  - Creación de dos páginas principales:
    - **Dashboard (`/`)**: Interfaz analítica y panel técnico de proyectos.
    - **Creative Portfolio (`/creative`)**: Portafolio artístico, inmersivo y de alta interactividad visual.

---

## 🚀 Instrucciones para Ejecución Local

Para instalar las dependencias e iniciar el servidor de desarrollo en tu computadora:

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo (Vite)**:
   ```bash
   npm run dev
   ```
   *El sitio estará disponible en `http://localhost:5173/`.*

3. **Compilar para producción**:
   ```bash
   npm run build
   ```
   *Generará los archivos optimizados dentro de la carpeta `/dist`.*

4. **Ver prototipos históricos**:
   - Puedes abrir directamente en el navegador cualquiera de los prototipos históricos una vez el servidor de desarrollo esté corriendo (ej. `http://localhost:5173/roko-portfolio-6.html`).
