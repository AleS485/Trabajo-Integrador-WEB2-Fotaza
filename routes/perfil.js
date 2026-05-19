import { Router } from "express"

// /perfil
const router = Router()

router.get("/", (req, res) => {

    res.render('perfil');

})


router.get('/:id', (req, res) => {

    res.send('hola');

})

router.get('/:id/seguidores', (req, res) => {

    res.render('seguidores');

})

router.get('/:id/seguidos', (req, res) => {

    res.render('seguidos');

})


export default router;