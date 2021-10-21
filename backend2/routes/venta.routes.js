'use strict'
const express = require('express');
const api = express.Router();
 
const VentaCtrl = require('../controllers/venta.controller');
 
api.get('/venta', VentaCtrl.getVentas);
api.post('/venta', VentaCtrl.registrarVenta);

 
module.exports = api;