// Guardamos el módulo express en una constante
const express = require("express");
const path = require('path');
const fs = require('fs');

// Como express es una función que crea una aplicación...
// La ejecutamos para guardar su resultado en app
const app = express();

app.use(express.static('public'));
app.use(express.json());

//para leer el archivo .json
const filePath = path.join(__dirname, 'datos', 'datos.json');

app.get('/api/datos', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            res.status(500).json({ error: 'Error al leer el archivo' });
            return;
        }

        try {
            const usuariosApi = JSON.parse(data);
            res.json(usuariosApi);
        } catch (err) {
            console.error('Error al parsear el JSON:', err);
            res.status(500).json({ error: 'Error al parsear el JSON' });
        }
    });
});


// Creamos una ruta con el método de app llamado get
app.get('/', function(req,res){
        res.sendFile(path.join(__dirname, '/views/index.html'));
    }
);

app.post('/guardarDatos', (req, res) => {
    const datos = req.body;

    // Guardar los datos en un archivo JSON
    const rutaArchivo = path.join(__dirname, 'datos', 'datos.json');
    
    fs.readFile(rutaArchivo, 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error('Error al leer el archivo:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        let datosActuales = [];
        if (!err) {
            try {
                datosActuales = JSON.parse(data);
            } catch (error) {
                console.error('Error al parsear JSON existente:', error);
                return res.status(500).json({ error: 'Error interno del servidor' });
            }
        }

        datosActuales.push(datos);

        fs.writeFile(rutaArchivo, JSON.stringify(datosActuales, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error al escribir en el archivo:', err);
                return res.status(500).json({ error: 'Error interno del servidor' });
            }

            console.log('Datos guardados correctamente en datos.json');
            res.json({ message: 'Datos guardados correctamente' });
        });
    });
});




const port = 3000;
// Con el método de app, listen, levantamos el servidor
app.listen(
    port,
    function () {
        console.log("Servidor encendido en el puerto "+port);
    }
);
