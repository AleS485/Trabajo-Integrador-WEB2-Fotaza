import { Router } from "express"
import { crearPublicacion, obtenerDatosDePublicacion, obtenerDatosParaEditar, actualizarPublicacion, eliminarPublicacion, agregarComentario, cambiarEstadoComentarios, borrarComentario } from "../controller/publicacion.js";

// /publicaciones
const router = Router()

router.get("/crear", (req, res) => {

    res.render('crear_publicacion');

})

router.get('/seguidas', (req, res) => {

    res.render('publicaciones_seguidas');

})

router.get('/editar/:id', obtenerDatosParaEditar);
router.put('/editar/:id', actualizarPublicacion);

router.post('/crear', crearPublicacion);
router.post('/eliminar/:id', eliminarPublicacion);

router.post("/comentarios/agregar/:idPublicacion", agregarComentario);
router.post("/comentarios/estado/:idPublicacion", cambiarEstadoComentarios);
router.post("/comentarios/borrar/:idComentario/:idPublicacion", borrarComentario);

router.get('/:id', async (req, res) =>{ // mostrar

    const idPublicacion = req.params.id;
    const datosBuscadosDePublicacion = await obtenerDatosDePublicacion(idPublicacion);

    if(!datosBuscadosDePublicacion){
        return res.status(404).send('No se lograron encontrar los datos de esta publicacion');
    }

    res.render('publicacion', {
        publicacion: datosBuscadosDePublicacion
    })

})

export default router;