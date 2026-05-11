import 'dotenv/config';
import express from 'express';
import { funcionSync } from './models/sync.js';

const PORT = process.env.PORT;

const app = express();


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
    res.send("Hola");
})










funcionSync().then(() => {
        // SERVIDOR
        app.listen(PORT, (err) => {
            if (err) {
                console.error('Error al iniciar el servidor:', err);
                return;
            }
            console.log(`Servidor escuchando en el puerto ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error sincronizando con bd:', err)
    })

// CONEXION A BD
// alter permite sincronizar y guardar tablas acorde a modelos
// force hace que se borre con drop table antes de crear la tabla






