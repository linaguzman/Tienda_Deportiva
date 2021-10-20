const express = require("express");
const productoSchema = require("../models/producto");

const router = express.Router();


//crear producto
router.post('/productos', (req, res) => {
   const producto = productoSchema(req.body);
   producto
      .save()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));

});

//obtener todos los productos get all prodcutos
router.get('/productos', (req, res) => {
   productoSchema
      .find()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));

});

// obtener un producto get a producto
router.get('/productos/:id', (req, res) => {
   const { id } = req.params;
   productoSchema
      .findById(id)
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));

});

// actualizar un producto update a producto
router.put("/productos/:id", (req, res) => {
   const { id } = req.params;
   const { codigo, nombre, precio, disponible } = req.body;
   productoSchema
      .updateOne({ _id: id }, { $set: { codigo, nombre, precio, disponible }})
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));

});

// eliminar un producto delete a producto
router.delete("/productos/:id", (req, res) => {
   const { id } = req.params;
  
   productoSchema
      .remove({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));

});


module.exports = router;