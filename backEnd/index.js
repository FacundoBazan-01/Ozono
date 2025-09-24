require("dotenv").config()
const express = require('express');
const { conection } = require('./config/database');
const cors = require('cors');
const app = express();

app.use(cors())
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
    res.send('Bienvenido a Ozono');
});

// Conexión a la base de datos
conection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conexión a la base de datos exitosa');
    }
});


// Puerto del servidor
const PORT = process.env.PORT;

app.listen(PORT,(err) =>{
    if (err) {
        console.error('Error al iniciar el servidor:', err);
    } else {
        console.log('Servidor corriendo en el puerto ' + PORT);
    }
});