import { Router } from "express"
import { buscarPublicaciones } from "../controller/buscar.js"



// /buscar
const router = Router()

router.get("/", buscarPublicaciones);



export default router;