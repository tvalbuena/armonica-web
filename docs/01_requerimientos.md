# Especificación de Requerimientos de Software
## ARMÓNICA — Centro de Cosmetología
### Proyecto Productivo SENA · Ficha 2758351

---

## 1. Información General del Proyecto

| Campo | Detalle |
|---|---|
| **Nombre del sistema** | ARMÓNICA — Sitio web Centro de Cosmetología |
| **Versión del documento** | 2.0 |
| **Fecha** | Junio 2026 |
| **Ficha SENA** | 2758351 |
| **Repositorio** | https://github.com/tvalbuena/armonica-web |
| **Stack tecnológico** | HTML5, CSS3, JavaScript, Bootstrap 5.3.2, Node.js, Express 5, PostgreSQL, jsonwebtoken, bcrypt |

---

## 2. Descripción General del Sistema

ARMÓNICA es una aplicación web diseñada para el Centro de Cosmetología homónimo, ubicado en Bogotá, Colombia. El sistema cumple tres propósitos principales:

1. **Presencia digital:** presentar los servicios, productos, equipo profesional e instalaciones del centro.
2. **Gestión de citas del cliente:** permitir a los clientes registrar solicitudes de cita directamente en la base de datos a través de una API REST con validaciones exhaustivas y sanitización de datos.
3. **Panel de administración protegido:** proporcionar a la administradora una interfaz autenticada con JWT para visualizar, gestionar y actualizar el estado de todas las citas registradas.

---

## 3. Requerimientos Funcionales

Los requerimientos funcionales describen las capacidades que el sistema **debe** proveer.

### RF-01 — Visualización de servicios

| Campo | Detalle |
|---|---|
| **ID** | RF-01 |
| **Nombre** | Visualización de catálogo de servicios |
| **Descripción** | El sistema debe mostrar al visitante los servicios ofrecidos por el centro, organizados en categorías: Armonización Facial, Tratamientos Faciales y Tratamientos Corporales. Cada servicio incluye imagen representativa, nombre y descripción breve. |
| **Prioridad** | Alta |
| **Estado** | Implementado |
| **Fuente** | Sección `#servicios` en `index.html` |

---

### RF-02 — Visualización de productos

| Campo | Detalle |
|---|---|
| **ID** | RF-02 |
| **Nombre** | Catálogo de productos |
| **Descripción** | El sistema debe presentar los productos disponibles con imagen, nombre y descripción, agrupados en: Hidratación y Cuidado Facial, Tratamientos Corporales, y Peeling & Renovación. |
| **Prioridad** | Media |
| **Estado** | Implementado |
| **Fuente** | Sección `#productos` en `index.html` |

---

### RF-03 — Presentación del equipo profesional

| Campo | Detalle |
|---|---|
| **ID** | RF-03 |
| **Nombre** | Información del equipo |
| **Descripción** | El sistema debe mostrar el perfil de cada profesional del centro, incluyendo foto circular, nombre completo y especialidad. |
| **Prioridad** | Media |
| **Estado** | Implementado |
| **Fuente** | Sección `#profesionales` en `index.html` |

---

### RF-04 — Galería de instalaciones

| Campo | Detalle |
|---|---|
| **ID** | RF-04 |
| **Nombre** | Carrusel de instalaciones |
| **Descripción** | El sistema debe presentar un carrusel de imágenes de las instalaciones físicas del centro con controles de navegación manual. |
| **Prioridad** | Baja |
| **Estado** | Implementado |
| **Fuente** | Sección `#instalaciones` en `index.html` |

---

### RF-05 — Galería de resultados

| Campo | Detalle |
|---|---|
| **ID** | RF-05 |
| **Nombre** | Carrusel de resultados antes/después |
| **Descripción** | El sistema debe mostrar un carrusel de rotación automática con imágenes de resultados reales de tratamientos realizados en el centro. |
| **Prioridad** | Media |
| **Estado** | Implementado |
| **Fuente** | Sección `#resultados` en `index.html` |

---

### RF-06 — Formulario de solicitud de cita vía WhatsApp

| Campo | Detalle |
|---|---|
| **ID** | RF-06 |
| **Nombre** | Agendamiento vía WhatsApp |
| **Descripción** | El sistema debe ofrecer un formulario con los campos: nombre, apellido, correo electrónico, teléfono y procedimiento de interés. Al presionar el botón de WhatsApp, el navegador abre WhatsApp con un mensaje pre-llenado con los datos del formulario. |
| **Prioridad** | Alta |
| **Estado** | Implementado |
| **Fuente** | Sección `#citas` en `index.html`; `js/main.js` — función `abrirWhatsApp()` |

---

### RF-07 — Registro de cita en la base de datos (API)

| Campo | Detalle |
|---|---|
| **ID** | RF-07 |
| **Nombre** | Creación de cita vía API REST con validaciones completas |
| **Descripción** | El sistema debe exponer el endpoint `POST /api/citas` que reciba los datos de la cita, aplique validaciones exhaustivas, sanitice los datos contra XSS y los persista en PostgreSQL. La respuesta exitosa incluye los datos de la cita creada con estado HTTP 201. |
| **Prioridad** | Alta |
| **Estado** | Implementado |
| **Fuente** | `backend/routes/citas.js` — handler `POST /api/citas` |

**Reglas de validación por campo:**

| Campo | Reglas implementadas |
|---|---|
| `nombre` | Solo letras y tildes (`/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+([a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*[a-zA-ZáéíóúÁÉÍÓÚñÑ])?$/`). No puede empezar ni terminar con espacio. No puede contener espacios dobles (`/\s{2,}/`). Entre 2 y 100 caracteres (después de `trim()`). |
| `apellido` | Mismas reglas que `nombre`. |
| `correo` | Formato válido (`/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/`). Dominio mínimo 2 caracteres. Máximo 150 caracteres. No se permiten dominios temporales: `mailinator.com`, `tempmail.com`, `guerrillamail.com`, `throwaway.email`, `yopmail.com`, `trashmail.com`. |
| `telefono` | Solo dígitos (`/^[0-9]{7,15}$/`). Entre 7 y 15 dígitos. No puede ser un único dígito repetido (`/^(\d)\1+$/`). |
| `procedimiento` | Debe ser exactamente una de las siguientes 10 opciones: Armonización Facial, Ácido Hialurónico, Toxina Botulínica / Botox, Hilos Tensores, Bioestimuladores (Profhilo, Radiesse, Sculptra), Limpieza Facial, Plasma Rico en Plaquetas, Dermapen (Microagujas), Tratamiento Corporal, Otro. |

**Controles adicionales de seguridad:**

| Control | Detalle |
|---|---|
| Campos extra | Si el body contiene campos distintos a los 5 permitidos, responde HTTP 400: `"Se enviaron campos no permitidos"`. |
| Tamaño del body | Si `Content-Length` supera 1 000 bytes, responde HTTP 400: `"La solicitud excede el tamaño permitido"`. |
| Sanitización XSS | Los campos `nombre` y `apellido` son procesados por `sanitizar()`, que elimina los caracteres `< > " ' \` ;` antes de persistir en la base de datos. |
| Rate limiting | Máximo 10 solicitudes por IP en ventana de 15 minutos. Al superar el límite, responde HTTP 429: `"Demasiadas solicitudes. Intenta de nuevo en 15 minutos"`. |

---

### RF-08 — Consulta de citas registradas (protegida)

| Campo | Detalle |
|---|---|
| **ID** | RF-08 |
| **Nombre** | Listado de citas vía API REST con autenticación JWT |
| **Descripción** | El sistema debe exponer el endpoint `GET /api/citas` que devuelva todas las citas almacenadas ordenadas de más reciente a más antigua (`fecha_solicitud DESC`). Esta ruta está protegida por el middleware `verificarToken()`: requiere el header `Authorization: Bearer <token>`. Sin token válido responde HTTP 401. |
| **Prioridad** | Alta |
| **Estado** | Implementado |
| **Fuente** | `backend/routes/citas.js` — handler `GET /api/citas`; `backend/middleware/auth.js` |

---

### RF-09 — Sección de reseñas

| Campo | Detalle |
|---|---|
| **ID** | RF-09 |
| **Nombre** | Visualización de testimonios de clientes |
| **Descripción** | El sistema debe mostrar reseñas de clientes con nombre, calificación en estrellas (5/5) y comentario. |
| **Prioridad** | Baja |
| **Estado** | Implementado |
| **Fuente** | Sección `#resenas` en `index.html` |

---

### RF-10 — Botón flotante de WhatsApp

| Campo | Detalle |
|---|---|
| **ID** | RF-10 |
| **Nombre** | Acceso directo a WhatsApp |
| **Descripción** | El sistema debe mostrar un botón flotante visible en todas las secciones de la página que permita al usuario iniciar una conversación directa en WhatsApp con el centro. |
| **Prioridad** | Media |
| **Estado** | Implementado |
| **Fuente** | `index.html` (`.whatsapp-float`); `css/styles.css` |

---

### RF-11 — Navegación por anclas

| Campo | Detalle |
|---|---|
| **ID** | RF-11 |
| **Nombre** | Menú de navegación con desplazamiento suave |
| **Descripción** | El sistema debe incluir una barra de navegación fija con enlaces a cada sección de la página (Servicios, Nosotras, Instalaciones, Resultados, Contáctanos). |
| **Prioridad** | Alta |
| **Estado** | Implementado |
| **Fuente** | `<nav>` en `index.html` |

---

### RF-12 — Login del administrador

| Campo | Detalle |
|---|---|
| **ID** | RF-12 |
| **Nombre** | Autenticación del administrador con JWT |
| **Descripción** | El sistema debe exponer el endpoint `POST /api/admin/login` que reciba `usuario` y `password`, verifique las credenciales contra la tabla `admin` usando `bcrypt.compare()`, y genere un token JWT con expiración de 8 horas firmado con `JWT_SECRET`. El endpoint aplica un rate limit de 5 intentos por IP en 15 minutos. Si las credenciales son inválidas, siempre responde HTTP 401 con el mensaje genérico `"Credenciales incorrectas"` sin revelar si el usuario existe en el sistema. |
| **Prioridad** | Alta |
| **Estado** | Implementado |
| **Fuente** | `backend/routes/admin.js` — handler `POST /api/admin/login`; `admin/admin.js` — evento `btnLogin` |

---

### RF-13 — Panel de administración

| Campo | Detalle |
|---|---|
| **ID** | RF-13 |
| **Nombre** | Visualización de citas en el panel administrador |
| **Descripción** | El sistema debe proporcionar un panel web (`admin/index.html`) que, previa autenticación JWT, muestre tres tarjetas de estadísticas (total de citas, citas pendientes, citas confirmadas) y una tabla completa con todas las citas registradas. La tabla incluye las columnas: ID, nombre completo, correo, teléfono, procedimiento, fecha de solicitud (formato local colombiano) y estado. Todas las peticiones al backend incluyen el token JWT en el header `Authorization: Bearer`. |
| **Prioridad** | Alta |
| **Estado** | Implementado |
| **Fuente** | `admin/index.html`; `admin/admin.js` — función `cargarCitas()` |

---

### RF-14 — Cambio de estado de citas

| Campo | Detalle |
|---|---|
| **ID** | RF-14 |
| **Nombre** | Actualización de estado de cita vía API REST |
| **Descripción** | El sistema debe exponer el endpoint `PATCH /api/citas/:id` que permita actualizar el campo `estado` de una cita existente. Los únicos valores de estado válidos son: `pendiente`, `confirmada`, `cancelada`. La ruta está protegida con el middleware JWT. Responde HTTP 404 si la cita no existe y HTTP 400 si el estado enviado no es válido. En el panel admin, el cambio se realiza mediante un `<select>` por fila que invoca automáticamente la función `cambiarEstado()` al cambiar la opción seleccionada. |
| **Prioridad** | Alta |
| **Estado** | Implementado |
| **Fuente** | `backend/routes/citas.js` — handler `PATCH /api/citas/:id`; `admin/admin.js` — función `cambiarEstado()` |

---

### RF-15 — Validaciones en tiempo real del formulario

| Campo | Detalle |
|---|---|
| **ID** | RF-15 |
| **Nombre** | Retroalimentación visual inmediata en el formulario de citas |
| **Descripción** | El sistema debe validar cada campo del formulario de citas en tiempo real, sin necesidad de enviar el formulario. Cada campo tiene un div de error asociado (`#error-nombre`, `#error-apellido`, `#error-correo`, `#error-telefono`, `#error-procedimiento`) que muestra el mensaje de error en rojo. Los campos de texto activan la validación en el evento `input`; el selector de procedimiento lo activa en el evento `change`. Las reglas son idénticas a las del backend. El botón de envío se deshabilita con el texto "Enviando..." durante el procesamiento. Al registrar correctamente, un mensaje de éxito en verde se limpia automáticamente después de 5 segundos. |
| **Prioridad** | Alta |
| **Estado** | Implementado |
| **Fuente** | `js/main.js` — objeto `validaciones`, función `validarCampo()`, bloque `Object.keys(campos).forEach(...)` |

---

### RF-16 — Persistencia de sesión del administrador

| Campo | Detalle |
|---|---|
| **ID** | RF-16 |
| **Nombre** | Sesión persistente con localStorage |
| **Descripción** | Al iniciar sesión exitosamente, el token JWT se almacena en `localStorage` bajo la clave `token_armonica`. Al cargar `admin/index.html`, si existe dicha clave, el sistema muestra el panel directamente sin requerir login. Si cualquier petición al backend retorna HTTP 401, el sistema elimina el token de `localStorage` y redirige a la pantalla de login. El cierre de sesión manual elimina el token de `localStorage` y regresa a la pantalla de login limpiando los campos del formulario. |
| **Prioridad** | Media |
| **Estado** | Implementado |
| **Fuente** | `admin/admin.js` — `localStorage.setItem/getItem/removeItem('token_armonica')`; manejo de `response.status === 401` en `cargarCitas()` |

---

## 4. Requerimientos No Funcionales

Los requerimientos no funcionales describen las **cualidades** que el sistema debe cumplir.

### RNF-01 — Compatibilidad con navegadores

| Campo | Detalle |
|---|---|
| **ID** | RNF-01 |
| **Categoría** | Compatibilidad |
| **Descripción** | El sistema debe ser compatible con las versiones actuales de Chrome, Firefox, Edge y Safari. |
| **Criterio de aceptación** | La interfaz se visualiza correctamente sin errores de diseño ni funcionalidad en los cuatro navegadores principales. |

---

### RNF-02 — Diseño responsivo

| Campo | Detalle |
|---|---|
| **ID** | RNF-02 |
| **Categoría** | Usabilidad |
| **Descripción** | El sistema debe adaptarse correctamente a dispositivos móviles (≥ 320 px), tabletas (≥ 768 px) y escritorios (≥ 1024 px) usando el sistema de cuadrícula de Bootstrap 5. |
| **Criterio de aceptación** | El menú de hamburguesa aparece en móvil; el contenido se reorganiza en columna única en pantallas pequeñas. |

---

### RNF-03 — Rendimiento de carga

| Campo | Detalle |
|---|---|
| **ID** | RNF-03 |
| **Categoría** | Rendimiento |
| **Descripción** | La página principal (`index.html`) debe cargarse en menos de 3 segundos en una conexión de 10 Mbps. |
| **Criterio de aceptación** | Medición en herramientas de desarrollador del navegador: tiempo de carga ≤ 3 s. |

---

### RNF-04 — Seguridad en múltiples capas

| Campo | Detalle |
|---|---|
| **ID** | RNF-04 |
| **Categoría** | Seguridad |
| **Descripción** | La API implementa defensa en profundidad: (1) validación exhaustiva de todos los campos en el backend antes de cualquier acceso a la base de datos, (2) sanitización XSS que elimina caracteres peligrosos (`< > " ' \` ;`) en campos de texto libre, (3) consultas SQL parametrizadas (`$1, $2...`) para prevenir inyección SQL, (4) credenciales de base de datos y `JWT_SECRET` en variables de entorno excluidas del repositorio mediante `.gitignore`, (5) contraseñas de administrador almacenadas exclusivamente como hash bcrypt, (6) autenticación JWT en todas las rutas de lectura y modificación de datos, (7) rate limiting en endpoints públicos sensibles, (8) `trust proxy 1` para obtener la IP real del cliente en producción. |
| **Criterio de aceptación** | El archivo `.env` no aparece en el historial de commits; `POST /api/citas` sin campos retorna HTTP 400; `GET /api/citas` sin token retorna HTTP 401; `POST /api/admin/login` con credenciales incorrectas retorna HTTP 401 con mensaje genérico, sin revelar si el usuario existe. |

---

### RNF-05 — Disponibilidad de la API

| Campo | Detalle |
|---|---|
| **ID** | RNF-05 |
| **Categoría** | Disponibilidad |
| **Descripción** | El servidor backend debe reiniciarse automáticamente ante fallos inesperados. En desarrollo se usa `nodemon` (script `npm run dev`). En producción se requiere un gestor de procesos (Railway o PM2). El pool de conexiones llama `process.exit(-1)` ante errores irrecuperables para permitir que el gestor de procesos relance el servicio. |
| **Criterio de aceptación** | En desarrollo: `nodemon` reinicia automáticamente el servidor ante cambios en archivos. En producción: el servicio se relanza automáticamente ante caída. |

---

### RNF-06 — Integración continua (CI)

| Campo | Detalle |
|---|---|
| **ID** | RNF-06 |
| **Categoría** | Mantenibilidad |
| **Descripción** | El proyecto incluye un pipeline CI/CD en GitHub Actions que valida automáticamente la sintaxis del HTML y la integridad del backend en cada push a `main` o pull request. |
| **Criterio de aceptación** | El archivo `.github/workflows/ci.yml` ejecuta los jobs `validar-html` y `validar-backend` sin errores en cada push a `main`. |

---

### RNF-07 — Estética y marca

| Campo | Detalle |
|---|---|
| **ID** | RNF-07 |
| **Categoría** | Usabilidad / Identidad visual |
| **Descripción** | El sistema mantiene coherencia visual con la paleta de colores corporativa del centro: mauve `#7B3F4A`, rosa polvo `#D48FA6`, verde salvia `#7C8C6B`; y las tipografías Playfair Display y Poppins. Esto aplica tanto al sitio principal como al panel de administración. |
| **Criterio de aceptación** | Revisión visual confirma uso consistente de paleta y fuentes en todos los componentes del sistema. |

---

### RNF-08 — Mantenibilidad del código

| Campo | Detalle |
|---|---|
| **ID** | RNF-08 |
| **Categoría** | Mantenibilidad |
| **Descripción** | El código sigue una arquitectura modular con responsabilidad única por archivo: servidor principal (`backend/index.js`), conexión a base de datos (`backend/db.js`), rutas de citas (`backend/routes/citas.js`), rutas de administración (`backend/routes/admin.js`), middleware de autenticación (`backend/middleware/auth.js`), lógica del formulario (`js/main.js`) y lógica del panel (`admin/admin.js`). |
| **Criterio de aceptación** | Revisión de código confirma que cada módulo tiene una única responsabilidad (Single Responsibility Principle). |

---

### RNF-09 — Protección contra fuerza bruta

| Campo | Detalle |
|---|---|
| **ID** | RNF-09 |
| **Categoría** | Seguridad |
| **Descripción** | El sistema implementa `express-rate-limit` en los dos endpoints más sensibles: `POST /api/citas` (máximo 10 solicitudes por IP en 15 minutos) y `POST /api/admin/login` (máximo 5 intentos por IP en 15 minutos). Ambos limitadores usan `standardHeaders: true` y `legacyHeaders: false`. El header `X-RateLimit-Limit` se incluye en la respuesta para que los clientes conozcan los límites. |
| **Criterio de aceptación** | La solicitud número 11 a `POST /api/citas` desde la misma IP retorna HTTP 429; la solicitud número 6 a `POST /api/admin/login` retorna HTTP 429 con el mensaje correspondiente. El bloqueo se libera automáticamente al finalizar la ventana de 15 minutos. |

---

### RNF-10 — Autenticación y autorización con JWT

| Campo | Detalle |
|---|---|
| **ID** | RNF-10 |
| **Categoría** | Seguridad |
| **Descripción** | Las rutas `GET /api/citas` y `PATCH /api/citas/:id` están protegidas por el middleware `verificarToken()` (`backend/middleware/auth.js`). El token debe enviarse en el header `Authorization` con el esquema `Bearer <token>`. El token se genera en `POST /api/admin/login` con `expiresIn: '8h'` firmado con `JWT_SECRET`. El middleware rechaza con HTTP 401 los tokens ausentes, inválidos o expirados, y agrega el payload decodificado a `req.admin` para uso en los handlers. |
| **Criterio de aceptación** | `GET /api/citas` sin header `Authorization` retorna HTTP 401 `"Acceso denegado. Token no proporcionado"`; con token expirado retorna HTTP 401 `"Token inválido o expirado"`; con token válido retorna HTTP 200 con la lista de citas. |

---

## 5. Restricciones del Sistema

| # | Restricción |
|---|---|
| R-01 | El proyecto se ejecuta sobre Node.js versión 20 LTS. |
| R-02 | La base de datos es PostgreSQL. No se admite sustitución por otro motor de base de datos sin modificar `backend/db.js`. |
| R-03 | El canal de agendamiento público principal es WhatsApp. El sistema no envía notificaciones por correo electrónico. |
| R-04 | El frontend principal es una Single Page Application (SPA) estática sin framework de JavaScript. |
| R-05 | El repositorio debe ser público en GitHub para el cumplimiento del proyecto SENA. |
| R-06 | La variable de entorno `JWT_SECRET` debe ser una cadena aleatoria segura de al menos 32 caracteres. El valor de producción no debe coincidir con el valor de desarrollo local. |

---

## 6. Estado Actual del Proyecto

| Componente | Estado | Observaciones |
|---|---|---|
| Frontend público | Desplegado en GitHub Pages | URL de producción activa |
| Backend | Corriendo en `localhost:3000` | Pendiente despliegue en Railway |
| Base de datos | Con registros de prueba | Pendiente limpieza antes de pasar a producción |
| Autenticación JWT | Implementada y funcional | Token expira en 8 horas |
| Panel de administración | Implementado y funcional | Requiere token JWT válido |
| CI/CD | GitHub Actions configurado | Pendiente integrar pruebas Playwright al pipeline |
| Colección Postman | Organizada con pruebas básicas | Pendiente completar cobertura de casos límite |
