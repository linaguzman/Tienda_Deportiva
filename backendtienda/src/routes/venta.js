const express = require("express");
const ventaSchema = require("../models/venta");

const router = express.Router();


//crear venta
router.post('/ventas', (req, res) => {
   const venta = ventaSchema(req.body);
   venta
      .save()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));

});

//obtener todos los venta get all venta
router.get('/ventas', (req, res) => {
   ventaSchema
      .find()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));

});

// obtener un venta get a venta
router.get('/ventas/:id', (req, res) => {
   const { id } = req.params;
   ventaSchema
      .findById(id)
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));

});

// actualizar una venta update a venta
router.put("/ventas/:id", (req, res) => {
   const { id } = req.params;
   const { cod_venta, valor_venta, id_producto, cantidad, precio, fecha_venta, doc_cliente, vendedor, estado } = req.body;
   ventaSchema
      .updateOne({ _id: id }, { $set: { cod_venta, valor_venta, id_producto, cantidad, precio, fecha_venta, doc_cliente, vendedor, estado }})
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));

});

// eliminar un venta delete a venta
router.delete("/ventas/:id", (req, res) => {
   const { id } = req.params;
  
   ventaSchema
      .remove({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));

});


module.exports = router;