import { Router } from "express"

// /publicaciones
const router = Router()

router.get("/crear", (req, res) => {

    res.render('crear_publicacion');

})

router.get('/seguidas', (req, res) => {

    res.render('publicaciones_seguidas');

})

router.get('/:id', (req, res) =>{

    res.render('publicacion');

})



export default router;