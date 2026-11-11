// =============================================
// BITWARS COHORTE 2025 - PROGRAMACIÓN IV
// SEPTIEMBRE 2026
// =============================================
// Conexión a PostgreSQL (Neon - Cloud)
// =============================================
const { Pool } = require('pg');
require('dotenv').config();

// Creamos un pool de conexiones usando la URL del .env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false  // Requerido por Neon
  }
});

// Mensaje de confirmación al conectar
pool.on('connect', () => {
  console.log('✅ Conectado a PostgreSQL (Neon Cloud)');
});

// Mensaje de error si algo falla
pool.on('error', (err) => {
  console.error('❌ Error en la conexión a PostgreSQL:', err.message);
});

module.exports = pool;