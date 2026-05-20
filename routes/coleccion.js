import { Router } from "express"

// coleccion
const router = Router()

router.get('/', (req, res) => { // vista base
    res.render('colecciones_mostrar');
})

router.get('/crear', (req, res) => {

    res.render('crear_coleccion');

})

router.post('/crear', (req, res) => {

    res.redirect('colecciones_mostrar');

})

router.get('/:id', (req, res) => {

    res.render('coleccionSeleccionada');

})

export default router;






