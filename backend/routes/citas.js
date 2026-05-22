const express = require('express');
const router = express.Router();
const pool = require('../db');
const verificarToken = require('../middleware/auth');
const rateLimit = require('express-rate-limit');

// Límite de solicitudes al formulario de citas
const citasLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    console.log(`Rate limit alcanzado desde IP: ${req.ip}`);
    res.status(429).json({
      errores: ['Demasiadas solicitudes. Intenta de nuevo en 15 minutos']
    });
  }
});

// Procedimientos válidos
const procedimientosValidos = [
  'Armonización Facial',
  'Ácido Hialurónico',
  'Toxina Botulínica / Botox',
  'Hilos Tensores',
  'Bioestimuladores (Profhilo, Radiesse, Sculptra)',
  'Limpieza Facial',
  'Plasma Rico en Plaquetas',
  'Dermapen (Microagujas)',
  'Tratamiento Corporal',
  'Otro'
];

// Dominios temporales no permitidos
const dominiosTemporales = [
  'mailinator.com', 'tempmail.com', 'guerrillamail.com',
  'throwaway.email', 'yopmail.com', 'trashmail.com'
];

// Función de sanitización
const sanitizar = (texto) => {
  return texto.replace(/[<>"'`;]/g, '').trim();
};

// Función de validación
const validarCita = (nombre, apellido, correo, telefono, procedimiento) => {
  const errores = [];

  // Campos obligatorios
  if (!nombre || !apellido || !correo || !telefono || !procedimiento) {
    errores.push('Todos los campos son obligatorios');
    return errores;
  }

  // No puede ser solo espacios en blanco
  if (!nombre.trim() || !apellido.trim() || !correo.trim() || !telefono.trim()) {
    errores.push('Los campos no pueden contener solo espacios en blanco');
    return errores;
  }

  // Nombre — solo letras y tildes, sin espacios dobles, entre 2 y 100 caracteres
  const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+([a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*[a-zA-ZáéíóúÁÉÍÓÚñÑ])?$/;
  const espaciosDobles = /\s{2,}/;
  if (!soloLetras.test(nombre.trim())) {
    errores.push('El nombre solo puede contener letras y no puede empezar ni terminar con espacio');
  } else if (espaciosDobles.test(nombre)) {
    errores.push('El nombre no puede tener espacios consecutivos');
  } else if (nombre.trim().length < 2 || nombre.trim().length > 100) {
    errores.push('El nombre debe tener entre 2 y 100 caracteres');
  }

  // Apellido — mismas reglas que nombre
  if (!soloLetras.test(apellido.trim())) {
    errores.push('El apellido solo puede contener letras y no puede empezar ni terminar con espacio');
  } else if (espaciosDobles.test(apellido)) {
    errores.push('El apellido no puede tener espacios consecutivos');
  } else if (apellido.trim().length < 2 || apellido.trim().length > 100) {
    errores.push('El apellido debe tener entre 2 y 100 caracteres');
  }

  // Correo — formato válido, sin espacios, máximo 150 caracteres, dominio mínimo 2 caracteres
  const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!correoValido.test(correo.trim())) {
    errores.push('El formato del correo electrónico no es válido');
  } else if (correo.trim().length > 150) {
    errores.push('El correo no puede exceder 150 caracteres');
  } else {
    const dominio = correo.trim().split('@')[1];
    if (dominiosTemporales.includes(dominio.toLowerCase())) {
      errores.push('No se permiten correos temporales');
    }
  }

  // Teléfono — solo números, entre 7 y 15 dígitos, no repetidos, Colombia empieza con 3
  const soloNumeros = /^[0-9]{7,15}$/;
  if (!soloNumeros.test(telefono.trim())) {
    errores.push('El teléfono solo puede contener números y debe tener entre 7 y 15 dígitos');
  } else if (/^(\d)\1+$/.test(telefono.trim())) {
    errores.push('El teléfono no puede ser un número repetido');
  }

  // Procedimiento — debe ser una opción válida
  if (!procedimientosValidos.includes(procedimiento)) {
    errores.push('El procedimiento seleccionado no es válido');
  }

  return errores;
};

router.post('/', citasLimiter, async (req, res) => {
  const { nombre, apellido, correo, telefono, procedimiento } = req.body;

  // Límite de tamaño del body
  const contentLength = parseInt(req.headers['content-length'] || '0');
  if (contentLength > 1000) {
    return res.status(400).json({ errores: ['La solicitud excede el tamaño permitido'] });
  }

  // Verificar que no lleguen campos extra
  const camposPermitidos = ['nombre', 'apellido', 'correo', 'telefono', 'procedimiento'];
  const camposRecibidos = Object.keys(req.body);
  const camposInvalidos = camposRecibidos.filter(campo => !camposPermitidos.includes(campo));
  if (camposInvalidos.length > 0) {
    return res.status(400).json({ errores: ['Se enviaron campos no permitidos'] });
  }

  const errores = validarCita(nombre, apellido, correo, telefono, procedimiento);
  if (errores.length > 0) {
    return res.status(400).json({ errores });
  }

  try {
    const resultado = await pool.query(
      `INSERT INTO citas (nombre, apellido, correo, telefono, procedimiento)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [sanitizar(nombre), sanitizar(apellido), correo.trim(), telefono.trim(), procedimiento]
    );

    res.status(201).json({
      mensaje: 'Cita registrada exitosamente',
      cita: resultado.rows[0]
    });

  } catch (error) {
    console.error('Error al guardar la cita:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.get('/', verificarToken, async (req, res) => {
  try {
    const resultado = await pool.query(
      'SELECT * FROM citas ORDER BY fecha_solicitud DESC'
    );

    res.status(200).json({
      citas: resultado.rows
    });

  } catch (error) {
    console.error('Error al obtener las citas:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;