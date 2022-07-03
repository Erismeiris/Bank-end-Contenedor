const express = require('express')
const cors = require('cors')
require('dotenv').config();
const { dbConnection } = require('./database/config')



//crear el servidor de express
const app = express()

// Base de dato
dbConnection();

//configurar CORS
app.use(cors())


//Lectura del body
app.use(express.json())



//Rutas
app.use('/api/usuarios', require('./routes/usuarios.route'))
app.use('/api/containers', require('./routes/containers.route'))
app.use('/api/bultos', require('./routes/bultos.route'))
app.use('/api/contenido', require('./routes/contenido.route'))
app.use('/api/busqueda', require('./routes/busqueda.route'))
app.use('/api/login', require('./routes/login.route'))

 

app.listen( process.env.PORT, (req, res)=>{
    
    console.log('Servidor corriendo en el puerto 3000')
})
