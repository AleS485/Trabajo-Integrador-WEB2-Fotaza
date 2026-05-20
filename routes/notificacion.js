import { Router } from "express"

// notificacion
const router = Router()

router.get('/', (req, res) => {

    res.render('notificaciones');

})

router.post('/leer/:id', (req, res) => {

    res.redirect('notificaciones');

})




export default router;






