import { Router } from "express";
import { crearColeccion, cargadoVistaColeccion, guardarEnColeccion, mostrarColecciones, cargarPublicacionesColeccion } from "../controller/coleccion.js";

// coleccion
const router = Router()

router.get('/', mostrarColecciones) 

// crear

router.get('/crear', (req, res) => {

    res.render('crear_coleccion');

})

router.post('/crear', crearColeccion);


// guardar


router.get('/guardar/:idPublicacion', cargadoVistaColeccion);

router.post('/guardar', guardarEnColeccion);


// seleccionada


router.get('/:idSeleccionada', cargarPublicacionesColeccion);





export default router;






