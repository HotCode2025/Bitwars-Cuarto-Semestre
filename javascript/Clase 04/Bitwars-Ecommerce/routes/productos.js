// =============================================
// BITWARS COHORTE 2025 - PROGRAMACIÓN IV
// SEPTIEMBRE 2026
// =============================================
// RUTA: /api/productos
// Devuelve todos los productos del catálogo
// =============================================
const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/productos -> Devuelve todos los productos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM productos ORDER BY categoria, nombre'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

module.exports = router;