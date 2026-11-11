// =============================================
// BITWARS COHORTE 2025 - PROGRAMACIÓN IV
// SEPTIEMBRE 2026
// =============================================
// ADAPTACIÓN DEL BACKEND PARA NETLIFY FUNCTIONS
// =============================================
const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');

const app = express();

// =============================================
// MIDDLEWARES
// =============================================
app.use(cors());
app.use(express.json());

// =============================================
// RUTAS DE LA API
// =============================================
const productosRoutes = require('../../routes/productos');
const pagoRoutes = require('../../routes/pago');

app.use('/api/productos', productosRoutes);
app.use('/api/pago', pagoRoutes);

// Ruta de prueba
app.get('/api', (req, res) => {
  res.json({ message: 'API Bitwars funcionando en Netlify' });
});

// =============================================
// PÁGINAS DE RESULTADO DEL PAGO
// =============================================

app.get('/exito', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Pago exitoso - Bitwars</title>
      <style>
        body { font-family: 'Roboto', Arial, sans-serif; background: #f4f4f4; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
        .card { background: white; padding: 40px; border-radius: 15px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); text-align: center; max-width: 500px; }
        h1 { color: #28a745; font-size: 2rem; margin-bottom: 15px; }
        p { color: #666; font-size: 1.1rem; margin-bottom: 20px; }
        a { display: inline-block; background: #009ee3; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: bold; text-transform: uppercase; }
        a:hover { background: #007bbd; }
        .emoji { font-size: 4rem; margin-bottom: 20px; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="emoji">✅</div>
        <h1>¡Pago exitoso!</h1>
        <p>Gracias por tu compra en Bitwars Cohorte 2025.</p>
        <a href="/">Volver al catálogo</a>
      </div>
    </body>
    </html>
  `);
});

app.get('/fallo', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Pago rechazado - Bitwars</title>
      <style>
        body { font-family: 'Roboto', Arial, sans-serif; background: #f4f4f4; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
        .card { background: white; padding: 40px; border-radius: 15px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); text-align: center; max-width: 500px; }
        h1 { color: #ff4444; font-size: 2rem; margin-bottom: 15px; }
        p { color: #666; font-size: 1.1rem; margin-bottom: 20px; }
        a { display: inline-block; background: #009ee3; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: bold; text-transform: uppercase; }
        a:hover { background: #007bbd; }
        .emoji { font-size: 4rem; margin-bottom: 20px; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="emoji">❌</div>
        <h1>Pago rechazado</h1>
        <p>Hubo un problema al procesar tu pago. Intentá nuevamente.</p>
        <a href="/">Volver al catálogo</a>
      </div>
    </body>
    </html>
  `);
});

app.get('/pendiente', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Pago pendiente - Bitwars</title>
      <style>
        body { font-family: 'Roboto', Arial, sans-serif; background: #f4f4f4; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
        .card { background: white; padding: 40px; border-radius: 15px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); text-align: center; max-width: 500px; }
        h1 { color: #f39c12; font-size: 2rem; margin-bottom: 15px; }
        p { color: #666; font-size: 1.1rem; margin-bottom: 20px; }
        a { display: inline-block; background: #009ee3; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: bold; text-transform: uppercase; }
        a:hover { background: #007bbd; }
        .emoji { font-size: 4rem; margin-bottom: 20px; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="emoji">⏳</div>
        <h1>Pago pendiente</h1>
        <p>Tu pago está siendo procesado. Te notificaremos cuando se acredite.</p>
        <a href="/">Volver al catálogo</a>
      </div>
    </body>
    </html>
  `);
});

// =============================================
// EXPORTAR COMO FUNCIÓN SERVERLESS
// =============================================
module.exports.handler = serverless(app);