'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const VentaSchema = Schema({
    
    idVenta: String,
    fecha_venta: Date,
    fecha_pago: Date,
    estado_venta: String,
    idCliente: String,
    nombre_cliente: String,
    total_venta: Number,
    idVendedor: String,
});
 
module.exports = mongoose.model('Venta', VentaSchema);