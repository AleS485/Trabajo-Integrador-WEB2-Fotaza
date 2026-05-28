import { Router } from "express"
import { crearPublicacion, obtenerDatosDePublicacion } from "../controller/publicacion.js";

// /publicaciones
const router = Router()

router.get("/crear", (req, res) => {

    res.render('crear_publicacion');

})

router.get('/seguidas', (req, res) => {

    res.render('publicaciones_seguidas');

})


router.get('/editar/:id', (req, res) => {

    res.render('editar_publicacion');

})

router.post('/crear', crearPublicacion);


router.post('editar/:id', (req, res) => {

    res.send('Publicacion Modificada con exito');

})

router.post('/eliminar/:id', (req, res) => {

    res.send('Publicacion eliminada');

})

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