import 'dotenv/config';
import express from 'express';
import perfilRouter from './routes/perfil.js';
import buscarRouter from './routes/buscar.js';
import publicacionesRouter from './routes/publicaciones.js';
import chatsRouter from './routes/chat.js';
import coleccionesRouter from './routes/coleccion.js';
import notificacionesRouter from './routes/notificacion.js';
import { funcionSync } from './models/index.js';
import { obtenerPublicaciones } from './controller/publicacion.js';


const PORT = process.env.PORT;

const app = express();


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.set('views', './views');

// endpoints

app.get('/', async (req, res) => {
    const publicacionesObtenidas = await obtenerPublicaciones() || [];

    const fotosAgregadas = [];
    for (let publicacion of publicacionesObtenidas) {
        if (publicacion.Fotografia && publicacion.Fotografia.length > 0) {
            fotosAgregadas.push(publicacion.Fotografia[0].urlArchivo.toString('base64'));
        } else {
            fotosAgregadas.push(''); 
        }
    }

    res.render('home', {
        publicaciones: publicacionesObtenidas,
        fotosAgregadas: fotosAgregadas
    });
})

app.use('/buscar', buscarRouter);

app.use('/perfil', perfilRouter);

app.use('/publicaciones', publicacionesRouter);

app.use('/chats', chatsRouter);

app.use('/colecciones', coleccionesRouter);

app.use('/notificaciones', notificacionesRouter);


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






