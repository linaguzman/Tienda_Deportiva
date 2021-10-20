const mongoose  = require("mongoose");

const ventaSchema = mongoose.Schema({
    cod_venta: {
        type:String,
        required: true
    },
    valor_venta: {
        type:Number,
        required:true
    },
    id_producto: {
        type: Number,
        required:true
    },
    cantidad: {
        type:number,
        required:true
    },
    precio: {
        type:number,
        required:true
    },
    fecha_venta: {
        type:Date,
        required:true
    },
    doc_cliente: {
        type:String,
        required:true
    },
    vendedor: {
        type:String,
        required:true
    },
    estado: {
        type:String,
        required:true
    }
});

module.exports = mongoose.model('venta', ventaSchema);