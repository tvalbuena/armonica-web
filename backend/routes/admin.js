const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// POST /api/admin/login
router.post('/login', async (req, res) => {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    return res.status(400).json({ error: 'Usuario y contraseña son obligatorios' });
  }

  try {
    const resultado = await pool.query(
      'SELECT * FROM admin WHERE usuario = $1',
      [usuario]
    );

    if (resultado.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const adminEncontrado = resultado.rows[0];
    const passwordCorrecta = await bcrypt.compare(password, adminEncontrado.password);

    if (!passwordCorrecta) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const token = jwt.sign(
      { id: adminEncontrado.id, usuario: adminEncontrado.usuario },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.status(200).json({
      mensaje: 'Login exitoso',
      token
    });

  } catch (error) {
    console.error('Error en login:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;