import 'dotenv/config';
import express from 'express';
import { funcionSync } from './models/index.js';

const PORT = process.env.PORT;

const app = express();


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.set('views', './views');

// endpoints

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/buscar', (req, res) => {
    res.render('buscar');
})

app.get('/perfil', (req, res) => {
    res.render('denuncia');
})

app.get('/publicaciones/seguidas', (req, res) => {
    res.render('publicaciones_seguidas'); // cambiar render temporal
})

app.get('/publicaciones/crear', (req, res) => {
    res.render('crear_publicacion');
})

app.get('/chats', (req, res) => {
    res.render('chats');
})

app.get('/colecciones/crear', (req, res) => {
    res.render('crear_coleccion');
})

app.get('/colecciones', (req, res) => {
    res.render('coleccionSeleccionada');
})

app.get('/notificaciones', (req, res) => {
    res.render('reportesValidador');
})

app.get('/logout', (req, res) => {
    res.send('Cerrando sesión');
});













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






