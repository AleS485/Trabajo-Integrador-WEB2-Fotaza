import { Router } from "express"

// /buscar
const router = Router()

router.get("/", (req, res) => {

    res.render('buscar');

})



export default router;