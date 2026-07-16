# Historias de Usuario con Criterios de Aceptación
## ARMÓNICA — Centro de Cosmetología
### Proyecto Productivo SENA · Ficha 2758351

---

## Convenciones

- **Formato de historia:** `Como [rol] quiero [funcionalidad] para [beneficio]`
- **Criterios de aceptación:** formato Gherkin `Given / When / Then`
- **Prioridad:** Alta · Media · Baja
- **Estado:** Implementado · En desarrollo · Pendiente

---

## HU-01 — Explorar los servicios del centro

| Campo | Detalle |
|---|---|
| **ID** | HU-01 |
| **Rol** | Visitante del sitio web |
| **Historia** | Como visitante del sitio web, quiero ver los servicios que ofrece ARMÓNICA con descripción e imagen, para evaluar si el centro satisface mis necesidades de cosmetología. |
| **Prioridad** | Alta |
| **Estado** | Implementado |
| **Fuente** | Sección `#servicios` en `index.html` |

### Criterios de Aceptación

```gherkin
Feature: Visualización de servicios del centro

  Scenario: Visitante accede a la sección de servicios por scroll
    Given que el visitante se encuentra en la página principal de ARMÓNICA
    When hace scroll hacia abajo hasta la sección "Servicios"
    Then debe ver tres tarjetas de servicio:
      | Servicio                |
      | Armonización Facial     |
      | Tratamientos Faciales   |
      | Tratamientos Corporales |
    And cada tarjeta debe mostrar una imagen representativa y una descripción breve

  Scenario: Visitante accede a la sección de servicios por el navbar
    Given que el visitante se encuentra en la parte superior de la página
    When hace clic en el enlace "Servicios" del menú de navegación
    Then la página se desplaza suavemente hasta la sección correspondiente
    And el menú de hamburguesa se colapsa si estaba abierto en pantalla móvil
```

---

## HU-02 — Conocer los productos disponibles

| Campo | Detalle |
|---|---|
| **ID** | HU-02 |
| **Rol** | Visitante del sitio web |
| **Historia** | Como visitante, quiero explorar el catálogo de productos cosméticos del centro, para saber qué marcas o líneas utilizan en los tratamientos. |
| **Prioridad** | Media |
| **Estado** | Implementado |
| **Fuente** | Sección `#productos` en `index.html` |

### Criterios de Aceptación

```gherkin
Feature: Catálogo de productos

  Scenario: Visitante accede a la sección de productos por scroll
    Given que el visitante está en la página principal
    When hace scroll hacia abajo hasta la sección "Productos"
    Then debe ver tres tarjetas de productos:
      | Producto                     |
      | Hidratación y Cuidado Facial |
      | Tratamientos Corporales      |
      | Peeling & Renovación         |
    And cada tarjeta incluye imagen, nombre y descripción

  Scenario: Visitante accede a la sección de productos por el navbar
    Given que el visitante se encuentra en la parte superior de la página
    When hace clic en el enlace "Productos" del menú de navegación
    Then la página se desplaza suavemente hasta la sección de productos
    And el menú de hamburguesa se colapsa si estaba abierto en pantalla móvil

  Scenario: Efecto visual al pasar el cursor sobre una tarjeta
    Given que el visitante está en un dispositivo de escritorio
    When posiciona el cursor sobre una tarjeta de producto
    Then la tarjeta se eleva visualmente con animación de desplazamiento hacia arriba
    And la imagen dentro de la tarjeta hace un zoom suave
```

---

## HU-03 — Conocer el equipo profesional

| Campo | Detalle |
|---|---|
| **ID** | HU-03 |
| **Rol** | Visitante del sitio web |
| **Historia** | Como visitante, quiero conocer el perfil y la especialidad de cada profesional del centro, para sentir confianza antes de agendar un tratamiento. |
| **Prioridad** | Media |
| **Estado** | Implementado |
| **Fuente** | Sección `#profesionales` en `index.html` |

### Criterios de Aceptación

```gherkin
Feature: Presentación del equipo

  Scenario: Visitante accede a la sección de profesionales por scroll
    Given que el visitante está en la página principal
    When hace scroll hacia abajo hasta la sección "Profesionales"
    Then debe ver las tarjetas de los profesionales del centro
    And cada tarjeta muestra foto circular, nombre completo y especialidad

  Scenario: Visitante accede a la sección de profesionales por el navbar
    Given que el visitante se encuentra en la parte superior de la página
    When hace clic en el enlace "Profesionales" del menú de navegación
    Then la página se desplaza suavemente hasta la sección correspondiente
    And el menú de hamburguesa se colapsa si estaba abierto en pantalla móvil

  Scenario: Visualización en dispositivo móvil
    Given que el visitante accede desde un smartphone
    When visualiza la sección de profesionales
    Then las tarjetas se apilan en una columna única
    And las imágenes mantienen su formato circular y proporción correcta
```

---

## HU-04 — Ver la galería de instalaciones

| Campo | Detalle |
|---|---|
| **ID** | HU-04 |
| **Rol** | Visitante del sitio web |
| **Historia** | Como visitante, quiero ver fotos de las instalaciones del centro, para evaluar el ambiente y la calidad del espacio antes de visitarlo. |
| **Prioridad** | Baja |
| **Estado** | Implementado |
| **Fuente** | Sección `#instalaciones` en `index.html` |

### Criterios de Aceptación

```gherkin
Feature: Galería de instalaciones

  Scenario: Visitante accede a la sección de instalaciones por scroll
    Given que el visitante está en la página principal
    When hace scroll hacia abajo hasta la sección "Instalaciones"
    Then debe ver un carrusel con fotografías de las instalaciones
    And puede navegar manualmente con los controles de anterior y siguiente

  Scenario: Visitante hace clic en el botón Cómo llegar
    Given que el visitante está en la sección de instalaciones
    When hace clic en el botón "Cómo llegar"
    Then el navegador abre Google Maps en una nueva pestaña
    And muestra la ubicación del centro en Carrera 72a Bis A # 10b-70, Villa Alsacia, Bogotá

  Scenario: Carrusel en pantalla pequeña
    Given que el visitante usa un dispositivo móvil
    When visualiza la galería de instalaciones
    Then el carrusel ocupa el ancho completo de la pantalla
    And los controles de navegación son visibles y accesibles con el dedo
```

---

## HU-05 — Consultar resultados de tratamientos

| Campo | Detalle |
|---|---|
| **ID** | HU-05 |
| **Rol** | Cliente potencial |
| **Historia** | Como cliente potencial, quiero ver imágenes de resultados reales de los tratamientos realizados en el centro, para tomar una decisión informada antes de agendar mi cita. |
| **Prioridad** | Media |
| **Estado** | Implementado |
| **Fuente** | Sección `#resultados` en `index.html` |

### Criterios de Aceptación

```gherkin
Feature: Galería de resultados

  Scenario: Visitante accede a la sección de resultados por scroll
    Given que el visitante está en la página principal
    When hace scroll hacia abajo hasta la sección "Resultados"
    Then debe ver un carrusel con imágenes de resultados de tratamientos:
      | Tratamiento        |
      | Relleno de Labios  |
      | Botox              |
      | Rinomodelación     |
      | Hilos tensores     |
    And el carrusel rota automáticamente cada 2 segundos

  Scenario: Visitante accede a la sección de resultados por el navbar
    Given que el visitante se encuentra en la parte superior de la página
    When hace clic en el enlace "Resultados" del menú de navegación
    Then la página se desplaza hasta la sección de resultados
    And el carrusel es visible con sus indicadores de posición

  Scenario: El carrusel rota automáticamente
    Given que el visitante está viendo la sección de resultados
    When no interactúa con los controles durante 2 segundos
    Then el carrusel avanza automáticamente a la siguiente imagen
    And el ciclo se repite de manera continua

  Scenario: Visitante visualiza el disclaimer de resultados
    Given que el visitante está en la sección de resultados
    Then debe ver el texto de aviso legal debajo del carrusel
    And el texto indica que las imágenes corresponden a resultados reales obtenidos en clientas del centro y se presentan con fines informativos
```

---

## HU-06 — Leer reseñas de otros clientes

| Campo | Detalle |
|---|---|
| **ID** | HU-06 |
| **Rol** | Cliente potencial |
| **Historia** | Como cliente potencial, quiero leer las opiniones y experiencias de otros clientes del centro, para confirmar la calidad del servicio antes de agendar. |
| **Prioridad** | Baja |
| **Estado** | Implementado |
| **Fuente** | Sección `#experiencias` en `index.html` |

### Criterios de Aceptación

```gherkin
Feature: Testimonios de clientes

  Scenario: Visitante accede a la sección de reseñas por scroll
    Given que el visitante está en la página principal
    When hace scroll hacia abajo hasta la sección "Experiencias de nuestras clientas"
    Then debe ver al menos 3 tarjetas con testimonios de clientes
    And cada tarjeta muestra nombre del cliente, calificación en estrellas y comentario
    And la sección muestra una calificación general de 5.0 basada en reseñas de Google

  Scenario: Verificación de calificación visual
    Given que el visitante está viendo una tarjeta de reseña
    Then la calificación se muestra con íconos de estrellas
    And el puntaje es de 5 estrellas por cada reseña visible
```

---

## HU-07 — Agendar cita mediante el formulario web

| Campo | Detalle |
|---|---|
| **ID** | HU-07 |
| **Rol** | Clienta del centro |
| **Historia** | Como clienta, quiero completar el formulario de citas y hacer clic en Agendar cita para que mis datos queden registrados en el sistema y el centro me contacte a la brevedad. |
| **Prioridad** | Alta |
| **Estado** | Implementado |
| **Fuente** | Sección `#cita` en `index.html`; `js/main.js` — función `enviarCita()`; `POST /api/citas` |

### Criterios de Aceptación

```gherkin
Feature: Agendamiento de cita mediante formulario web

  Scenario: Clienta agenda cita exitosamente con datos válidos
    Given que la clienta está en la sección "Agenda tu cita"
    And completa los campos nombre, apellido, correo, teléfono y procedimiento correctamente
    When hace clic en el botón "Agendar cita"
    Then el sistema envía los datos a POST /api/citas con Content-Type application/json
    And el servidor responde con código HTTP 201
    And aparece el mensaje "¡Cita registrada exitosamente! Nos pondremos en contacto contigo pronto. 🌸" en verde
    And el formulario se limpia automáticamente dejando todos los campos vacíos
    And el mensaje de éxito desaparece automáticamente después de 5 segundos
    And la cita queda almacenada en PostgreSQL con estado "pendiente"

  Scenario: Botón deshabilitado durante el envío
    Given que la clienta completa todos los campos correctamente
    When hace clic en "Agendar cita"
    Then el botón cambia su texto a "Enviando..." y queda deshabilitado
    And permanece deshabilitado hasta recibir la respuesta del servidor
    And se rehabilita independientemente de si la respuesta fue exitosa o fallida

  Scenario: Error de conexión con el servidor
    Given que la clienta completa todos los campos correctamente
    And el servidor backend no está disponible
    When hace clic en "Agendar cita"
    Then aparece el mensaje "Error de conexión. Verifica tu conexión a internet e intenta de nuevo." en rojo
    And el formulario no se limpia — los datos permanecen para que la clienta pueda reintentar

  Scenario: Intento de envío con campos vacíos
    Given que la clienta no ha completado ningún campo del formulario
    When hace clic en "Agendar cita"
    Then el sistema muestra mensajes de error debajo de cada campo obligatorio vacío
    And no se realiza ninguna petición HTTP al servidor
```

---

## HU-08 — Registrar una cita mediante la API

| Campo | Detalle |
|---|---|
| **ID** | HU-08 |
| **Rol** | Sistema / Integración |
| **Historia** | Como sistema, necesito registrar las solicitudes de cita en la base de datos PostgreSQL a través de la API REST con validaciones completas, para que el centro cuente con un historial confiable y sin datos corruptos. |
| **Prioridad** | Alta |
| **Estado** | Implementado |
| **Fuente** | `backend/routes/citas.js` — `POST /api/citas` |

### Criterios de Aceptación

```gherkin
Feature: Registro de cita vía API REST

  Scenario: Solicitud válida con todos los campos correctos
    Given que el cliente envía una petición POST a "/api/citas"
    And el cuerpo contiene nombre "María", apellido "Rodríguez", correo "maria@gmail.com",
        telefono "3101234567" y procedimiento "Limpieza Facial"
    When el servidor procesa la solicitud
    Then responde con código HTTP 201
    And el cuerpo incluye "mensaje": "Cita registrada exitosamente"
    And el cuerpo incluye el objeto "cita" con los datos persistidos
    And la cita queda almacenada en la tabla "citas" con estado "pendiente"

  Scenario: Nombre con caracteres numéricos o especiales (caso negativo)
    Given que el cliente envía nombre "Mar1a" o "Mar@a"
    When el servidor valida la solicitud
    Then responde con código HTTP 400
    And el cuerpo incluye en el arreglo "errores" el mensaje:
        "El nombre solo puede contener letras y no puede empezar ni terminar con espacio"

  Scenario: Nombre de 1 carácter (caso límite inferior)
    Given que el cliente envía nombre "A" (1 carácter)
    Then el servidor responde HTTP 400 con "El nombre debe tener entre 2 y 100 caracteres"

  Scenario: Nombre de exactamente 2 caracteres (límite inferior válido)
    Given que el cliente envía nombre "Li" (2 caracteres)
    Then el servidor acepta el campo sin error de longitud

  Scenario: Nombre con espacios dobles (caso negativo)
    Given que el cliente envía nombre "María  José" (dos espacios entre palabras)
    Then el servidor responde HTTP 400 con "El nombre no puede tener espacios consecutivos"

  Scenario: Correo de dominio temporal bloqueado
    Given que el cliente envía correo "test@mailinator.com"
    Then el servidor responde HTTP 400 con "No se permiten correos temporales"
    And lo mismo aplica para: tempmail.com, guerrillamail.com, throwaway.email, yopmail.com, trashmail.com

  Scenario: Correo sin dominio de suficiente longitud
    Given que el cliente envía correo "user@test.c" (extensión de 1 carácter)
    Then el servidor responde HTTP 400 con "El formato del correo electrónico no es válido"

  Scenario: Teléfono con dígito único repetido (caso negativo)
    Given que el cliente envía telefono "3333333333" (mismo dígito repetido)
    Then el servidor responde HTTP 400 con "El teléfono no puede ser un número repetido"

  Scenario: Teléfono con menos de 7 dígitos (caso límite inferior)
    Given que el cliente envía telefono "123456" (6 dígitos)
    Then el servidor responde HTTP 400 con
        "El teléfono solo puede contener números y debe tener entre 7 y 15 dígitos"

  Scenario: Procedimiento no perteneciente al listado válido
    Given que el cliente envía procedimiento "Depilación láser"
    Then el servidor responde HTTP 400 con "El procedimiento seleccionado no es válido"

  Scenario: Body con campo extra no permitido
    Given que el cliente envía el body con un campo adicional como "descuento": "50%"
    Then el servidor responde HTTP 400 con "Se enviaron campos no permitidos"

  Scenario: Body que excede el límite de tamaño (1 000 bytes)
    Given que el cliente envía una petición con Content-Length mayor a 1 000 bytes
    Then el servidor responde HTTP 400 con "La solicitud excede el tamaño permitido"

  Scenario: Rate limit alcanzado
    Given que la misma IP ha enviado 10 solicitudes POST a "/api/citas" en los últimos 15 minutos
    When envía la solicitud número 11
    Then el servidor responde con código HTTP 429
    And el cuerpo incluye "Demasiadas solicitudes. Intenta de nuevo en 15 minutos"

  Scenario: Error de conexión con la base de datos
    Given que la base de datos no está disponible
    When el servidor recibe una petición POST válida
    Then responde con código HTTP 500
    And el cuerpo incluye "error": "Error interno del servidor"
    And el error se registra en la consola del servidor
```

---

## HU-09 — Consultar todas las citas registradas

| Campo | Detalle |
|---|---|
| **ID** | HU-09 |
| **Rol** | Administradora del sistema |
| **Historia** | Como administradora, quiero consultar todas las citas registradas a través de la API autenticada, para tener un historial de solicitudes recibidas y hacer seguimiento. |
| **Prioridad** | Alta |
| **Estado** | Implementado |
| **Fuente** | `backend/routes/citas.js` — `GET /api/citas`; `backend/middleware/auth.js` |

### Criterios de Aceptación

```gherkin
Feature: Consulta de citas registradas (protegida con JWT)

  Scenario: Consulta exitosa con token válido y citas registradas
    Given que la administradora envía una petición GET a "/api/citas"
    And el header "Authorization: Bearer <token_valido>" está presente
    And existen citas registradas en la base de datos
    When el servidor procesa la solicitud
    Then responde con código HTTP 200
    And el cuerpo incluye un arreglo "citas" con todos los registros
    And los registros están ordenados de más reciente a más antiguo (por "fecha_solicitud" DESC)

  Scenario: Consulta sin token JWT (caso negativo)
    Given que la administradora envía GET a "/api/citas" sin el header Authorization
    Then el servidor responde con código HTTP 401
    And el cuerpo incluye "error": "Acceso denegado. Token no proporcionado"

  Scenario: Consulta con token expirado o inválido (caso negativo)
    Given que la administradora envía GET a "/api/citas" con un token vencido o manipulado
    Then el servidor responde con código HTTP 401
    And el cuerpo incluye "error": "Token inválido o expirado"

  Scenario: Consulta exitosa sin citas registradas
    Given que no existen citas en la base de datos
    And el token JWT es válido
    Then el servidor responde con código HTTP 200
    And el cuerpo incluye "citas": []

  Scenario: Error de conexión con la base de datos
    Given que la base de datos no está disponible
    When la administradora realiza la petición GET con token válido
    Then el servidor responde con código HTTP 500
    And el cuerpo incluye "error": "Error interno del servidor"
```

---

## HU-10 — Contactar directamente por WhatsApp

| Campo | Detalle |
|---|---|
| **ID** | HU-10 |
| **Rol** | Visitante / Cliente |
| **Historia** | Como visitante, quiero tener acceso rápido a WhatsApp en cualquier momento mientras navego por el sitio, sin tener que buscar el número de contacto. |
| **Prioridad** | Media |
| **Estado** | Implementado |
| **Fuente** | `index.html` — enlace `<a href="https://wa.me/573227132918" class="whatsapp-float">`; `css/styles.css` |

### Criterios de Aceptación

```gherkin
Feature: Botón flotante de WhatsApp

  Scenario: Botón visible en toda la página con animación de pulso
    Given que el visitante está en cualquier sección de la página
    Then el botón flotante de WhatsApp es visible en la esquina inferior izquierda
    And el botón mantiene su posición fija al hacer scroll
    And el botón muestra una animación de pulso continua cada 2 segundos

  Scenario: Clic en el botón flotante abre WhatsApp sin datos del formulario
    Given que el visitante visualiza el botón flotante de WhatsApp
    When hace clic sobre él
    Then el navegador abre WhatsApp dirigido al número 573227132918
    And se abre en una nueva pestaña o en la app nativa según el dispositivo
    And el mensaje NO incluye datos del formulario — es un contacto directo vacío

  Scenario: Efecto hover sobre el botón flotante
    Given que el visitante está en un dispositivo de escritorio
    When posiciona el cursor sobre el botón flotante
    Then la animación de pulso se pausa
    And el botón escala ligeramente hacia arriba

  Scenario: Contraste y visibilidad del botón
    Given que el visitante navega por secciones de fondo oscuro o claro
    Then el botón mantiene visibilidad adecuada gracias al color verde (#25d366)
    And no se superpone ni oculta contenido importante de la página
```

---

## HU-11 — Validación continua del código (CI)

| Campo | Detalle |
|---|---|
| **ID** | HU-11 |
| **Rol** | Desarrollador / Equipo SENA |
| **Historia** | Como desarrollador, quiero que el proyecto ejecute validaciones automáticas de HTML y backend en cada push o pull request, para detectar errores de sintaxis antes de integrar cambios a la rama principal. |
| **Prioridad** | Media |
| **Estado** | Implementado |
| **Fuente** | `.github/workflows/ci.yml` |

### Criterios de Aceptación

```gherkin
Feature: Pipeline de integración continua

  Scenario: Push exitoso a rama main
    Given que un desarrollador realiza un push con código válido a la rama "main"
    When GitHub Actions ejecuta el pipeline CI
    Then el job "validar-html" pasa sin errores
    And el job "validar-backend" pasa sin errores
    And el estado del pipeline se muestra como "success" en el repositorio

  Scenario: Push con HTML inválido
    Given que un desarrollador realiza un push con errores de sintaxis HTML
    When GitHub Actions ejecuta el pipeline CI
    Then el job "validar-html" falla y reporta los errores específicos
    And el pipeline se marca como "failure"

  Scenario: Pull request hacia main
    Given que un desarrollador abre un pull request hacia la rama "main"
    When GitHub Actions ejecuta el pipeline CI automáticamente
    Then ambos jobs se ejecutan antes de que el PR pueda ser fusionado
    And el resultado del pipeline es visible en el PR de GitHub
```

---

## HU-12 — Login del administrador

| Campo | Detalle |
|---|---|
| **ID** | HU-12 |
| **Rol** | Administradora del sistema |
| **Historia** | Como administradora, quiero iniciar sesión con mi usuario y contraseña para acceder al panel de gestión de citas de manera segura, sabiendo que mis credenciales están protegidas. |
| **Prioridad** | Alta |
| **Estado** | Implementado |
| **Fuente** | `backend/routes/admin.js` — `POST /api/admin/login`; `admin/index.html`; `admin/admin.js` |

### Criterios de Aceptación

```gherkin
Feature: Login de administradora

  Scenario: Login exitoso con credenciales válidas
    Given la administradora está en la página de login del panel admin
    And el servidor backend está disponible
    When ingresa el usuario correcto y la contraseña correcta
    And hace clic en el botón "Ingresar"
    Then el servidor verifica la contraseña con bcrypt.compare()
    And responde con código HTTP 200 y un token JWT con expiración de 8 horas
    And el token se almacena en localStorage bajo la clave "token_armonica"
    And la pantalla de login se oculta y aparece el panel de citas

  Scenario: Login con contraseña incorrecta (caso negativo)
    Given la administradora está en la página de login
    When ingresa el usuario correcto pero una contraseña incorrecta
    And hace clic en "Ingresar"
    Then el servidor responde con código HTTP 401
    And el sistema muestra el mensaje "Credenciales incorrectas"
    And no se almacena ningún token en localStorage
    And la administradora permanece en la pantalla de login

  Scenario: Login con usuario inexistente — mensaje genérico (caso negativo)
    Given la administradora está en la página de login
    When ingresa un usuario que no existe en el sistema
    And hace clic en "Ingresar"
    Then el servidor responde con código HTTP 401
    And el mensaje mostrado es exactamente "Credenciales incorrectas"
    And el sistema no revela si el usuario existe o no en la base de datos

  Scenario: Login con campos vacíos (validación frontend)
    Given la administradora está en la página de login
    When deja el campo usuario vacío y hace clic en "Ingresar"
    Then el sistema muestra "El usuario es obligatorio" bajo el campo usuario
    And no se realiza ninguna petición HTTP al servidor
    When completa el usuario pero deja la contraseña vacía y hace clic en "Ingresar"
    Then el sistema muestra "La contraseña es obligatoria" bajo el campo contraseña

  Scenario: Bloqueo por múltiples intentos fallidos — rate limiting
    Given la administradora ha realizado 5 intentos de login fallidos consecutivos desde la misma IP
    When intenta iniciar sesión nuevamente (6.° intento)
    Then el servidor responde con código HTTP 429
    And el mensaje indica "Demasiados intentos fallidos. Intenta de nuevo en 15 minutos"
    And el bloqueo se mantiene durante la ventana de 15 minutos
    And al expirar la ventana, el contador de intentos se reinicia
```

---

## HU-13 — Panel de administración

| Campo | Detalle |
|---|---|
| **ID** | HU-13 |
| **Rol** | Administradora del sistema |
| **Historia** | Como administradora, quiero ver todas las citas registradas con sus datos completos y estadísticas de resumen, para tener una visión clara del flujo de trabajo del centro. |
| **Prioridad** | Alta |
| **Estado** | Implementado |
| **Fuente** | `admin/index.html`; `admin/admin.js` — función `cargarCitas()`; `GET /api/citas` |

### Criterios de Aceptación

```gherkin
Feature: Panel de administración de citas

  Scenario: Carga exitosa del panel con token válido
    Given la administradora tiene un token JWT válido almacenado en localStorage
    When carga la página admin/index.html
    Then el sistema muestra el panel de citas directamente sin solicitar login
    And envía GET /api/citas con el header "Authorization: Bearer <token>"
    And el servidor responde con código HTTP 200 y la lista de citas

  Scenario: Acceso al panel sin token almacenado (caso negativo)
    Given no existe el valor "token_armonica" en localStorage
    When la administradora accede a admin/index.html
    Then el sistema muestra el formulario de login
    And no intenta cargar las citas ni realizar ninguna petición protegida

  Scenario: Visualización correcta de estadísticas
    Given la administradora está en el panel con 10 citas cargadas
    And de esas citas: 6 tienen estado "pendiente", 3 "confirmada" y 1 "cancelada"
    Then la tarjeta "Total citas" muestra el valor 10
    And la tarjeta "Pendientes" muestra el valor 6
    And la tarjeta "Confirmadas" muestra el valor 3
    And no existe tarjeta independiente para las canceladas

  Scenario: Visualización de la tabla de citas con todas las columnas
    Given el panel ha cargado citas exitosamente
    Then la tabla muestra una fila por cada cita con las columnas:
      | Columna       |
      | ID            |
      | Nombre        |
      | Correo        |
      | Teléfono      |
      | Procedimiento |
      | Fecha         |
      | Estado        |
    And la fecha se muestra en formato local colombiano (dd/mm/aaaa)
    And cada fila contiene un dropdown select para cambiar el estado

  Scenario: Panel sin citas registradas
    Given la administradora accede al panel con token válido
    And no hay citas en la base de datos
    Then la tabla muestra el mensaje "No hay citas registradas"
    And las tarjetas de estadísticas muestran 0 en todos los contadores
```

---

## HU-14 — Cambio de estado de citas

| Campo | Detalle |
|---|---|
| **ID** | HU-14 |
| **Rol** | Administradora del sistema |
| **Historia** | Como administradora, quiero cambiar el estado de una cita directamente desde la tabla del panel, para gestionar mi agenda de manera rápida y sin navegar a otra pantalla. |
| **Prioridad** | Alta |
| **Estado** | Implementado |
| **Fuente** | `backend/routes/citas.js` — `PATCH /api/citas/:id`; `admin/admin.js` — función `cambiarEstado()` |

### Criterios de Aceptación

```gherkin
Feature: Cambio de estado de citas

  Scenario: Cambio exitoso de estado a "confirmada"
    Given la administradora está en el panel con el listado de citas
    And la cita con ID 5 tiene estado "pendiente"
    When selecciona "Confirmada" en el dropdown de la fila correspondiente
    Then el frontend envía PATCH /api/citas/5 con body {"estado": "confirmada"}
    And el header "Authorization: Bearer <token>" está presente en la petición
    And el servidor responde con código HTTP 200
    And el cuerpo incluye "mensaje": "Estado actualizado correctamente"
    And la tabla se recarga reflejando el nuevo estado

  Scenario: Cambio exitoso de estado a "cancelada"
    Given la cita con ID 3 tiene estado "pendiente"
    When la administradora selecciona "Cancelada" en el dropdown de esa fila
    Then el servidor actualiza el estado a "cancelada" en la base de datos
    And responde con HTTP 200 y el objeto completo de la cita actualizada

  Scenario: Intento de asignar estado inválido (caso negativo)
    Given un agente externo envía PATCH /api/citas/1 con body {"estado": "aprobada"}
    Then el servidor responde con código HTTP 400
    And el cuerpo incluye "error": "Estado no válido"
    And la base de datos no es modificada

  Scenario: Intento de cambiar estado en cita inexistente (caso negativo)
    Given la administradora envía PATCH /api/citas/9999
    And no existe ninguna cita con ese ID en la base de datos
    Then el servidor responde con código HTTP 404
    And el cuerpo incluye "error": "Cita no encontrada"

  Scenario: Intento de cambio sin token JWT (caso negativo — acceso no autorizado)
    Given un cliente intenta enviar PATCH /api/citas/1 sin el header Authorization
    Then el servidor responde con código HTTP 401
    And el cuerpo incluye "error": "Acceso denegado. Token no proporcionado"
    And la base de datos no es modificada
```

---

## HU-15 — Validaciones en tiempo real del formulario

| Campo | Detalle |
|---|---|
| **ID** | HU-15 |
| **Rol** | Clienta del centro |
| **Historia** | Como clienta, quiero ver mensajes de error claros en tiempo real mientras completo el formulario de citas, para corregir mis datos antes de intentar enviarlos y evitar frustración. |
| **Prioridad** | Alta |
| **Estado** | Implementado |
| **Fuente** | `js/main.js` — objeto `validaciones`, función `validarCampo()`, listeners `Object.keys(campos).forEach(...)` |

### Criterios de Aceptación

```gherkin
Feature: Validaciones en tiempo real del formulario de citas

  Scenario: Error visible al escribir nombre con números (caso negativo — tiempo real)
    Given la clienta está en el formulario de citas
    When escribe "Ana123" en el campo nombre
    Then el div #error-nombre muestra inmediatamente "El nombre solo puede contener letras"
    And el mensaje aparece en rojo sin necesidad de hacer clic en enviar

  Scenario: Mensaje de error desaparece al corregir el campo
    Given el campo nombre muestra el mensaje de error
    When la clienta corrige el valor a "Ana"
    Then el div #error-nombre queda vacío
    And no hay ningún mensaje de error visible bajo ese campo

  Scenario: Error por nombre de 1 carácter (caso límite inferior inválido)
    Given la clienta escribe "A" (1 carácter) en el campo nombre
    Then el div #error-nombre muestra "El nombre debe tener entre 2 y 100 caracteres"

  Scenario: Sin error por nombre de 2 caracteres (caso límite inferior válido)
    Given la clienta escribe "Li" (2 caracteres) en el campo nombre
    Then el div #error-nombre no muestra ningún mensaje de error

  Scenario: Error por correo electrónico inválido (caso negativo)
    Given la clienta está completando el formulario
    When escribe "ana@" en el campo correo
    Then el div #error-correo muestra "El formato del correo no es válido"
    When completa el correo como "ana@gmail.com"
    Then el mensaje de error desaparece

  Scenario: Error por correo de dominio temporal (caso negativo)
    Given la clienta escribe "test@mailinator.com" en el campo correo
    Then el div #error-correo muestra "No se permiten correos temporales"
    And lo mismo aplica para dominios: tempmail.com, guerrillamail.com, throwaway.email, yopmail.com, trashmail.com
    And esta validación existe tanto en el frontend como en el backend

  Scenario: Error por teléfono con caracteres no numéricos (caso negativo)
    Given la clienta escribe "312abc456" en el campo teléfono
    Then el div #error-telefono muestra "El teléfono solo puede contener entre 7 y 15 dígitos"

  Scenario: Error por teléfono con dígito único repetido (caso negativo)
    Given la clienta escribe "3333333333" en el campo teléfono
    Then el div #error-telefono muestra "El teléfono no puede ser un número repetido"

  Scenario: Error por teléfono de 6 dígitos (caso límite inferior inválido)
    Given la clienta escribe "123456" (6 dígitos) en el campo teléfono
    Then el div #error-telefono muestra el mensaje de error de longitud

  Scenario: Error al intentar enviar sin seleccionar procedimiento
    Given la clienta no ha interactuado con el selector de procedimiento
    When hace clic en el botón "Agendar cita"
    Then el div #error-procedimiento muestra "Selecciona un procedimiento"
    And no se realiza ninguna petición HTTP al servidor

  Scenario: Error al interactuar con el selector sin elegir opción
    Given la clienta hace clic en el selector de procedimiento
    When cambia el foco a otro campo sin seleccionar ninguna opción
    Then el div #error-procedimiento muestra "Selecciona un procedimiento"

  Scenario: Botón deshabilitado durante el envío al servidor
    Given todos los campos del formulario son válidos
    When la clienta hace clic en el botón "Agendar cita"
    Then el botón cambia su texto a "Enviando..." y queda deshabilitado
    And permanece deshabilitado hasta que llegue la respuesta del servidor
    And se rehabilita independientemente de si la respuesta fue exitosa o fallida

  Scenario: Mensaje de éxito con limpieza automática a los 5 segundos
    Given todos los campos son válidos y el servidor está disponible
    When la clienta envía el formulario correctamente
    Then aparece el mensaje "¡Cita registrada exitosamente! Nos pondremos en contacto contigo pronto. 🌸" en verde
    And el formulario se limpia automáticamente (todos los campos quedan vacíos)
    And el mensaje de éxito desaparece automáticamente después de 5 segundos
```

---

## HU-16 — Persistencia de sesión del administrador

| Campo | Detalle |
|---|---|
| **ID** | HU-16 |
| **Rol** | Administradora del sistema |
| **Historia** | Como administradora, quiero que mi sesión en el panel persista entre visitas al sitio, para no tener que iniciar sesión cada vez que accedo a gestionar las citas del centro. |
| **Prioridad** | Media |
| **Estado** | Implementado |
| **Fuente** | `admin/admin.js` — `localStorage.setItem/getItem/removeItem('token_armonica')`; manejo de `response.status === 401` en `cargarCitas()` |

### Criterios de Aceptación

```gherkin
Feature: Persistencia de sesión con localStorage

  Scenario: Sesión persiste al recargar la página del panel
    Given la administradora ha iniciado sesión exitosamente
    And el token "token_armonica" está almacenado en localStorage
    When recarga la página admin/index.html
    Then el sistema detecta el token en localStorage al inicio del script
    And muestra el panel de citas directamente sin mostrar el formulario de login
    And carga la lista de citas actualizada desde la API

  Scenario: Acceso directo sin sesión previa (caso negativo)
    Given no existe la clave "token_armonica" en localStorage del navegador
    When la administradora accede a admin/index.html
    Then el sistema muestra únicamente el formulario de login
    And el panel de citas permanece oculto
    And no se realiza ninguna petición a la API

  Scenario: Redirección automática al expirar el token
    Given la administradora tiene un token expirado almacenado en localStorage
    When el sistema intenta cargar las citas (GET /api/citas)
    Then el servidor responde con código HTTP 401
    And el sistema elimina "token_armonica" de localStorage
    And oculta el panel de citas y muestra el formulario de login automáticamente

  Scenario: Cierre de sesión manual
    Given la administradora está en el panel de citas con sesión activa
    When hace clic en el botón "Cerrar sesión"
    Then el sistema elimina "token_armonica" de localStorage
    And oculta el panel de citas y muestra el formulario de login
    And los campos de usuario y contraseña quedan vacíos para un nuevo inicio de sesión
```

---

## HU-17 — Hero section

| Campo | Detalle |
|---|---|
| **ID** | HU-17 |
| **Rol** | Visitante del sitio web |
| **Historia** | Como visitante, quiero ver una sección hero con título, subtítulo e imagen al ingresar al sitio, y tener acceso rápido mediante dos botones a las funcionalidades principales, para orientarme desde el primer momento. |
| **Prioridad** | Alta |
| **Estado** | Implementado |
| **Fuente** | Sección hero en `index.html` |

### Criterios de Aceptación

```gherkin
Feature: Hero section

  Scenario: Visitante ve el hero al cargar la página
    Given que el visitante ingresa a la página principal de ARMÓNICA
    Then debe ver el título "Realza tu belleza en manos de expertos"
    And debe ver un subtítulo descriptivo de los servicios
    And debe ver una imagen representativa de tratamientos estéticos
    And debe ver dos botones de acción

  Scenario: Visitante hace clic en "Agendar cita" desde el hero
    Given que el visitante está en la sección hero
    When hace clic en el botón "Agendar cita"
    Then la página hace scroll hasta la sección del formulario de citas con id="cita"

  Scenario: Visitante hace clic en "Consultar servicios" desde el hero
    Given que el visitante está en la sección hero
    When hace clic en el botón "Consultar servicios"
    Then la página hace scroll hasta la sección de servicios con id="servicios"

  Scenario: Hero responsivo en dispositivo móvil
    Given que el visitante accede desde un smartphone
    When carga la página principal
    Then el título y subtítulo se muestran en columna única
    And los botones se apilan verticalmente
    And la imagen se muestra debajo del texto
```

---

## HU-18 — Footer informativo

| Campo | Detalle |
|---|---|
| **ID** | HU-18 |
| **Rol** | Visitante del sitio web |
| **Historia** | Como visitante, quiero encontrar en el footer enlaces rápidos a todas las secciones, información de contacto completa y redes sociales, para navegar o contactar al centro sin tener que hacer scroll hasta arriba. |
| **Prioridad** | Baja |
| **Estado** | Implementado |
| **Fuente** | Footer en `index.html`; `css/styles.css` |

### Criterios de Aceptación

```gherkin
Feature: Footer informativo

  Scenario: Visitante consulta los enlaces rápidos del footer
    Given que el visitante está en el footer de la página
    Then debe ver la sección "Enlaces Rápidos" con los siguientes enlaces:
      | Enlace        | Destino           |
      | Servicios     | #servicios        |
      | Productos     | #productos        |
      | Profesionales | #profesionales    |
      | Instalaciones | #instalaciones    |
      | Resultados    | #resultados       |
      | Reseñas       | #experiencias     |
      | Agendar cita  | #cita             |

  Scenario: Visitante consulta la información de contacto
    Given que el visitante está en el footer
    Then debe ver la dirección del centro
    And debe ver el número de teléfono 322 713 2918
    And debe ver el correo armonicacentrodecosmetologia@gmail.com
    And debe ver el horario Lun - Sáb: 8:00 AM - 6:00 PM

  Scenario: Visitante accede a redes sociales desde el footer
    Given que el visitante está en el footer
    When hace clic en el ícono de Instagram
    Then el navegador abre el perfil de Instagram del centro en nueva pestaña
    When hace clic en el ícono de WhatsApp
    Then el navegador abre WhatsApp dirigido al número del centro

  Scenario: Visitante ve el copyright en el footer
    Given que el visitante está en el footer
    Then debe ver el texto de copyright con el año actual
```

---

## Resumen de Historias de Usuario

| ID | Historia | Prioridad | Estado |
|---|---|---|---|
| HU-01 | Explorar servicios del centro | Alta | Implementado |
| HU-02 | Conocer productos disponibles | Media | Implementado |
| HU-03 | Conocer el equipo profesional | Media | Implementado |
| HU-04 | Ver galería de instalaciones | Baja | Implementado |
| HU-05 | Consultar resultados de tratamientos | Media | Implementado |
| HU-06 | Leer reseñas de clientes | Baja | Implementado |
| HU-07 | Agendar cita mediante formulario web | Alta | Implementado |
| HU-08 | Registrar cita mediante API | Alta | Implementado |
| HU-09 | Consultar citas registradas (JWT) | Alta | Implementado |
| HU-10 | Contactar directamente por WhatsApp | Media | Implementado |
| HU-11 | Validación continua del código CI | Media | Implementado |
| HU-12 | Login del administrador | Alta | Implementado |
| HU-13 | Panel de administración | Alta | Implementado |
| HU-14 | Cambio de estado de citas | Alta | Implementado |
| HU-15 | Validaciones en tiempo real del formulario | Alta | Implementado |
| HU-16 | Persistencia de sesión del administrador | Media | Implementado |
| HU-17 | Hero section | Alta | Implementado |
| HU-18 | Footer informativo | Baja | Implementado |
