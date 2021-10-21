'use strict'
const Venta = require('../models/Venta.model.js')
 
function getVentas(req, res){
    Ventas.find({}, (error, ventas)=>{
        //En caso de que haya habido un error
        if(error) return res.status(500).send({
            message: `Error al realiza la consulta de los ventas: ${error}`
        });
 
        //En caso que no haya ventas
        if(!ventas) return res.status(404).send({
            message: `No hay ventas registradas`
        });
 
        //En caso que todo vaya bien
        res.status(200).send({ productos });
    })
}
 
function registrarVenta(req, res){
    console.log('POST /api/venta');
    console.log(req.body);
 
    //Primero buscamos la venta en la base de datos
    Venta.findOne({codigo: req.body.codigo}, (err, ventaEnBaseDeDatos)=>{
        if(!ventaEnBaseDeDatos){
            //Si no se encuentra la venta, se guarda
            let ventaTemp = {
                idVenta: req.body.idventa,
                fecha_venta: req.body.fecha_venta,
                fecha_pago: req.body.fecha_pago,
                estado_venta: req.body.estado_venta,
                idCliente: req.body.idCliente,
                nombre_cliente: req.body.nombre_Cliente ,
                total_venta: req.body.total_venta,
                idVendedor: req.body.idVendedor,
            }
       
            let ventaARegistrar = new Venta(ventaTemp);
       
            ventaARegistrar.save((error, ventaRegistrado)=>{
                if(!error){
                    res.status(200).send({
                        message: 'Venta registrado',
                        ventaRegistrado
                    })
                }else{
                    res.status(500).send({
                        message: `Error al guardar nueva venta en la base de datos: ${err}`
                    });
                }
            })
 
           
        }else{
            //Si se encuenra el venta sacamos un error
            res.status(400).send({
                message: `La venta con codigo ${req.body.codigo} ya se encuentra registrada`
            })
        }
    });
 
}
 
 
module.exports = {
    getVentas,
    registrarVenta
}