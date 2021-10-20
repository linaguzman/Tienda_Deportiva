const express = require("express");
const usuarioSchema = require("../models/usuario");

const router = express.Router();


//crear usuario
router.post('/usuarios', (req, res) => {
   const usuario = usuarioSchema(req.body);
   usuario
      .save()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));

});

//obtener todos los usuarios get all usuario
router.get('/usuarios', (req, res) => {
   usuarioSchema
      .find()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));

});

// obtener un usuario get a usuario
router.get('/usuario/:id', (req, res) => {
   const { id } = req.params;
   usuarioSchema
      .findById(id)
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));

});

// actualizar un usuario update a usuario
router.put("/usuarios/:id", (req, res) => {
   const { id } = req.params;
   const { idusuario, nombres, apellidos, correo, rol, Est_solicitud } = req.body;
   usuarioSchema
      .updateOne({ _id: id }, { $set: { idusuario, nombres, apellidos, correo, rol, Est_solicitud }})
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));

});

// eliminar un producto delete a producto
router.delete("/usuarios/:id", (req, res) => {
   const { id } = req.params;
  
   usuarioSchema
      .remove({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));

});


module.exports = router;