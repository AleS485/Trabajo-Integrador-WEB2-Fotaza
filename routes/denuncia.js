import { Router } from "express"
import { formularioDenunciaFoto, crearDenunciarFoto, formularioDenunciaComentario, crearDenunciarComentario, denunciasPendientes, cargarPanelValidador, resolverDenuncia } from "../controller/denuncia.js";



// /denuncias
const router = Router()

router.get('/', (req, res) => { 
    res.render('denuncia');
})

//denuncias para las fotos y comentarios

router.get('/foto/:idFotografia', formularioDenunciaFoto);
router.post('/foto/:idFotografia', crearDenunciarFoto);

router.get('/comentario/:idComentario', formularioDenunciaComentario);
router.post('/comentario/:idComentario', crearDenunciarComentario);

// rutas para el validador

router.get('/reportes', denunciasPendientes);

router.get('/revisar/:idDenuncia', cargarPanelValidador);

router.post('/resolver/:idDenuncia', resolverDenuncia);


export default router;



