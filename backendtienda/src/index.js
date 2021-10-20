const express = require('express');
const mongoose = require("mongoose");
require("dotenv").config();
const  productoRoutes = require("./routes/producto");
const  usuarioRoutes = require("./routes/usuario");
const  ventaRoutes = require("./routes/venta");


const app = express();
const port = process.env.PORT || 9000;


//middleware
app.use(express.json());
app.use('/api', productoRoutes);
app.use('/api', usuarioRoutes);
app.use('/api', ventaRoutes);


//routes
app.get('/', (req, res) =>{
    res.send('welcome to my Api');
});

//mongodb conection
mongoose.connect(process.env.MONGODB_URI)
.then(() =>console.log("connected to MongoDB Atlas"

))
.catch((error) => console.error(error));

app.listen(port, () => console.log('server listening on port', port));
