const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/', async (req, res) => {
  const { nombre, apellido, correo, telefono, procedimiento } = req.body;

  if (!nombre || !apellido || !correo || !telefono || !procedimiento) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const resultado = await pool.query(
      `INSERT INTO citas (nombre, apellido, correo, telefono, procedimiento)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [nombre, apellido, correo, telefono, procedimiento]
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

module.exports = router;