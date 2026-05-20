import { Router } from "express"

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

router.post('editar/:id', (req, res) => {

    res.send('Publicacion Modificada con exito');

})

router.post('/eliminar/:id', (req, res) => {

    res.send('Publicacion eliminada');

})

router.get('/:id', (req, res) =>{

    res.render('publicacion');

})

export default router;