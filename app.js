import 'dotenv/config';
import express from 'express';
import session from 'express-session'; 
import perfilRouter from './routes/perfil.js';
import buscarRouter from './routes/buscar.js';
import authRouter from './routes/auth.js';
import publicacionesRouter from './routes/publicaciones.js';
import chatsRouter from './routes/chat.js';
import coleccionesRouter from './routes/coleccion.js';
import notificacionesRouter from './routes/notificacion.js';
import denunciasRouter from './routes/denuncia.js';
import { funcionSync } from './models/index.js';
import { obtenerPublicaciones } from './controller/publicacion.js';
import { authMiddleware } from './middleware/auth.js';
import { navMiddleware } from './middleware/nav.js';


const PORT = process.env.PORT;

const app = express();


app.use(express.static('public'));
app.use(session({
        secret: process.env.SESSION_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: {
        secure: false, // produccion cambiar a true
        maxAge: 24 * 60 * 60 * 1000, // 24h
        httpOnly: true,
        sameSite: 'lax', 
    },
}));
app.use(express.json({limit: '4mb'}));
app.use(express.urlencoded({ limit: '4mb', extended: true }));
app.set('view engine', 'pug');
app.set('views', './views');

// endpoints

app.get('/', navMiddleware, async (req, res) => {
    try{
        const pagina = parseInt(req.query.pagina) || 1;
        const {publicaciones, totalPaginas, paginaActual} = await obtenerPublicaciones(pagina, 6);

        res.render('home', {
            publicaciones: publicaciones,
            totalPaginas: totalPaginas,
            paginaActual: paginaActual
        });
    }catch (error) {
        console.error('ERROR TRAYENDO PUBLICACIONES AL FEED: ', error);
        res.render('home', { publicaciones: [], totalPaginas: 1, paginaActual: 1 });
    } 
})

app.use('/buscar', authMiddleware, buscarRouter);

app.use('/perfil', authMiddleware, perfilRouter);

app.use('/publicaciones', publicacionesRouter);

app.use('/chats', authMiddleware ,chatsRouter);

app.use('/colecciones', authMiddleware, coleccionesRouter);

app.use('/notificaciones', authMiddleware, notificacionesRouter);

app.use('/denuncias', authMiddleware, denunciasRouter);

app.use('/auth', authRouter);


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






