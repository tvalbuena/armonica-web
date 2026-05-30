// ===========================
// ARMÓNICA — Formulario de Citas
// ===========================

const API_URL = 'http://localhost:3000';

// ===========================
// REFERENCIAS AL DOM
// ===========================

const campos = {
  nombre: document.getElementById('nombre'),
  apellido: document.getElementById('apellido'),
  correo: document.getElementById('correo'),
  telefono: document.getElementById('telefono'),
  procedimiento: document.getElementById('procedimiento'),
};

const errores = {
  nombre: document.getElementById('error-nombre'),
  apellido: document.getElementById('error-apellido'),
  correo: document.getElementById('error-correo'),
  telefono: document.getElementById('error-telefono'),
  procedimiento: document.getElementById('error-procedimiento'),
};

const btnEnviar = document.getElementById('btnEnviar');
const mensajeGeneral = document.getElementById('mensaje-general');

// ===========================
// EXPRESIONES REGULARES
// ===========================

const REGEX = {
  soloLetras: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+([a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*[a-zA-ZáéíóúÁÉÍÓÚñÑ])?$/,
  correo: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  telefono: /^[0-9]{7,15}$/,
  espaciosDobles: /\s{2,}/,
};

// ===========================
// VALIDACIONES POR CAMPO
// ===========================

const validaciones = {
  nombre: (valor) => {
    if (!valor) return 'El nombre es obligatorio';
    if (!REGEX.soloLetras.test(valor)) return 'El nombre solo puede contener letras';
    if (REGEX.espaciosDobles.test(valor)) return 'El nombre no puede tener espacios consecutivos';
    if (valor.length < 2 || valor.length > 100) return 'El nombre debe tener entre 2 y 100 caracteres';
    return '';
  },
  apellido: (valor) => {
    if (!valor) return 'El apellido es obligatorio';
    if (!REGEX.soloLetras.test(valor)) return 'El apellido solo puede contener letras';
    if (REGEX.espaciosDobles.test(valor)) return 'El apellido no puede tener espacios consecutivos';
    if (valor.length < 2 || valor.length > 100) return 'El apellido debe tener entre 2 y 100 caracteres';
    return '';
  },
  correo: (valor) => {
    if (!valor) return 'El correo es obligatorio';
    if (!REGEX.correo.test(valor)) return 'El formato del correo no es válido';
    if (valor.length > 150) return 'El correo no puede exceder 150 caracteres';
    return '';
  },
  telefono: (valor) => {
    if (!valor) return 'El teléfono es obligatorio';
    if (!REGEX.telefono.test(valor)) return 'El teléfono solo puede contener entre 7 y 15 dígitos';
    if (/^(\d)\1+$/.test(valor)) return 'El teléfono no puede ser un número repetido';
    return '';
  },
  procedimiento: (valor) => {
    if (!valor) return 'Selecciona un procedimiento';
    return '';
  },
};

// ===========================
// FUNCIONES UTILITARIAS
// ===========================

const mostrarError = (campo, mensaje) => {
  errores[campo].textContent = mensaje;
};

const limpiarError = (campo) => {
  errores[campo].textContent = '';
};

const validarCampo = (campo) => {
  const valor = campos[campo].value.trim();
  const mensaje = validaciones[campo](valor);
  mostrarError(campo, mensaje);
  return mensaje === '';
};

const limpiarFormulario = () => {
  Object.values(campos).forEach(campo => campo.value = '');
  Object.keys(errores).forEach(limpiarError);
};

const mostrarMensajeGeneral = (texto, tipo) => {
  mensajeGeneral.textContent = texto;
  mensajeGeneral.className = `col-12 text-center mt-2 ${tipo}`;
};

const limpiarMensajeGeneral = () => {
  mensajeGeneral.textContent = '';
  mensajeGeneral.className = 'col-12 text-center mt-2';
};

const setBtnEstado = (cargando) => {
  btnEnviar.disabled = cargando;
  btnEnviar.innerHTML = cargando
    ? 'Enviando...'
    : '<i class="bi bi-calendar-check me-2"></i>Agendar cita';
};

// ===========================
// VALIDACIÓN EN TIEMPO REAL
// ===========================

Object.keys(campos).forEach(campo => {
  const evento = campo === 'procedimiento' ? 'change' : 'input';
  campos[campo].addEventListener(evento, () => validarCampo(campo));
});

// ===========================
// ENVÍO DEL FORMULARIO A LA API
// ===========================

const enviarCita = async () => {
  limpiarMensajeGeneral();

  const todosValidos = Object.keys(campos).every(campo => validarCampo(campo));
  if (!todosValidos) return;

  setBtnEstado(true);

  const payload = {
    nombre: campos.nombre.value.trim(),
    apellido: campos.apellido.value.trim(),
    correo: campos.correo.value.trim(),
    telefono: campos.telefono.value.trim(),
    procedimiento: campos.procedimiento.value,
  };

  try {
    const response = await fetch(`${API_URL}/api/citas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      const mensajeError = data.errores
        ? data.errores.join(' | ')
        : data.error || 'Error al registrar la cita';
      mostrarMensajeGeneral(mensajeError, 'text-danger');
      return;
    }

    mostrarMensajeGeneral(
      '¡Cita registrada exitosamente! Nos pondremos en contacto contigo pronto. 🌸',
      'text-success fw-semibold'
    );
    limpiarFormulario();

    // Limpiar mensaje de éxito después de 5 segundos
    setTimeout(limpiarMensajeGeneral, 5000);

  } catch (error) {
    mostrarMensajeGeneral(
      'Error de conexión. Verifica tu conexión a internet e intenta de nuevo.',
      'text-danger'
    );
  } finally {
    setBtnEstado(false);
  }
};

btnEnviar.addEventListener('click', enviarCita);

// ===========================
// BOTÓN FLOTANTE WHATSAPP
// ===========================

const abrirWhatsApp = () => {
  const nombre = campos.nombre.value;
  const apellido = campos.apellido.value;
  const correo = campos.correo.value;
  const telefono = campos.telefono.value;
  const procedimiento = campos.procedimiento.value;

  const mensaje =
    `Hola ARMÓNICA! Me gustaría agendar una cita 😊%0A%0A` +
    `*Nombre:* ${nombre} ${apellido}%0A` +
    `*Correo:* ${correo}%0A` +
    `*Teléfono:* ${telefono}%0A` +
    `*Procedimiento de interés:* ${procedimiento}`;

  window.open(`https://wa.me/573227132918?text=${mensaje}`, '_blank');
};

const btnWhatsapp = document.getElementById('btnWhatsapp');
if (btnWhatsapp) {
  btnWhatsapp.addEventListener('click', abrirWhatsApp);
}