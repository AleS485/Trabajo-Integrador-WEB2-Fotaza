import { Router } from "express"
import { crearPublicacion, obtenerDatosDePublicacion, obtenerDatosParaEditar, actualizarPublicacion, eliminarPublicacion, agregarComentario, cambiarEstadoComentarios, borrarComentario, valorarFoto } from "../controller/publicacion.js";
import { authMiddleware } from "../middleware/auth.js";

// /publicaciones
const router = Router()

router.get("/crear", authMiddleware, (req, res) => {

    res.render('crear_publicacion');

})

router.get('/seguidas', authMiddleware, (req, res) => {

    res.render('publicaciones_seguidas');

})

router.get('/editar/:id', authMiddleware, obtenerDatosParaEditar);
router.put('/editar/:id', authMiddleware, actualizarPublicacion);

router.post('/crear', crearPublicacion);
router.post('/eliminar/:id', eliminarPublicacion);

router.post("/comentarios/agregar/:idPublicacion", authMiddleware, agregarComentario);
router.post("/comentarios/estado/:idPublicacion", authMiddleware, cambiarEstadoComentarios);
router.post("/comentarios/borrar/:idComentario/:idPublicacion", authMiddleware, borrarComentario);

router.post("/valorar/:idPublicacion", authMiddleware, valorarFoto);

router.get('/:id', async (req, res) =>{ // mostrar

    const idPublicacion = req.params.id;
    const datosBuscadosDePublicacion = await obtenerDatosDePublicacion(idPublicacion);

    if(!datosBuscadosDePublicacion){
        return res.status(404).send('No se lograron encontrar los datos de esta publicacion');
    }

    let tieneCopy = false;
    for(let foto of datosBuscadosDePublicacion.fotos){
        if(foto.isCopyright){
            tieneCopy = true;
            break;
        }
    }

    if(tieneCopy && !req.session.user){
        return res.redirect('/auth/login');
    }

    res.render('publicacion', {
        publicacion: datosBuscadosDePublicacion,
        currentUser: req.session.user
    })

})

export default router;