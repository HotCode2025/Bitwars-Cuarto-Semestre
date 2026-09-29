// =============================================
// BITWARS COHORTE 2025 - PROGRAMACIÓN IV
// SEPTIEMBRE 2026
// =============================================
// RUTAS DE PAGO - CHECKOUT PRO
// =============================================
const express = require('express');
const router = express.Router();
const { MercadoPagoConfig, Preference } = require('mercadopago');
require('dotenv').config();

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

const preferenceApi = new Preference(client);

// Usa BASE_URL del entorno (localhost en local, Netlify en producción)
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

// =============================================
// RUTA: Crear preferencia (Checkout Pro)
// =============================================
router.post('/crear-preferencia', async (req, res) => {
  const { items } = req.body;

  const itemsMP = items.map(item => ({
    title: item.nombre,
    quantity: item.cantidad,
    unit_price: Number(item.precio),
    currency_id: 'ARS',
  }));

  const body = {
    items: itemsMP,
    back_urls: {
      success: `${BASE_URL}/exito`,
      failure: `${BASE_URL}/fallo`,
      pending: `${BASE_URL}/pendiente`,
    },
    auto_return: 'approved',
  };

  try {
    const result = await preferenceApi.create({ body });
    res.json({ init_point: result.init_point });
  } catch (error) {
    console.error('Error al crear preferencia:', error);
    res.status(500).json({ error: 'Error al procesar el pago' });
  }
});

module.exports = router;