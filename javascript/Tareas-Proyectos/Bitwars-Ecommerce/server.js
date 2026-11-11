// =============================================
// BITWARS COHORTE 2025 - PROGRAMACIÓN IV
// SEPTIEMBRE 2026
// =============================================
// SERVIDOR PRINCIPAL - UNIFICADO
// Sirve el frontend y la API en el mismo puerto
// =============================================
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// =============================================
// MIDDLEWARES
// =============================================
app.use(cors());
app.use(express.json());

// Servir archivos estáticos (frontend)
app.use(express.static(path.join(__dirname, 'public')));

// =============================================
// RUTAS DE LA API
// =============================================
const productosRoutes = require('./routes/productos');
const pagoRoutes = require('./routes/pago');

app.use('/api/productos', productosRoutes);
app.use('/api/pago', pagoRoutes);

// =============================================
// RUTA COMODÍN (para cualquier URL sirve el index.html)
// =============================================
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// =============================================
// INICIAR SERVIDOR
// =============================================
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log('==========================================');
  console.log('🚀 BITWARS COHORTE 2025 - PROGRAMACIÓN IV');
  console.log('📅 Septiembre 2026');
  console.log('==========================================');
  console.log(`🌐 Abrí el navegador en: http://localhost:${PORT}`);
  console.log(`📦 API de productos: http://localhost:${PORT}/api/productos`);
  console.log('==========================================');
});