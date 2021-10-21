'use strict'
const express = require('express');
const api = express.Router();
 
const UsuarioCtrl = require('../controllers/usuario.controller');
 
api.get('/usuario', UsuarioCtrl.getUsuarios);
api.post('/usuario', UsuariosCtrl.registrarUsuario);

 
module.exports = api;