 // ===========================
// SERVIDOR PRINCIPAL - ARMÓNICA
// ===========================

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: '¡Servidor ARMÓNICA funcionando correctamente! 🌸' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ARMÓNICA corriendo en http://localhost:${PORT}`);
});
