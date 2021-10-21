
'use strict'
const mongoose = require('mongoose');

const app = require('./app');
const config = require('./config');


mongoose.connect(config.db, {useNewUrlParser: true}, (err, res)=>{
      //en caso de que haya habido algún error
    if(err) {
        return console.log(`Error al conectar a la base de datos ${err}`);
    }

       //si no hay error
       console.log("connected to MongoDB Atlas");
       app.listen(config.port, ()=> {
        console.log(`Api Rest corriendo en http://localhost:${config.port}`)
    });
});


