import { Router } from "express"
import { listarNotificaciones, marcarLeidaNotificacion } from "../controller/notificacion.js";

// notificacion
const router = Router()

router.get('/', listarNotificaciones);

router.post('/leer/:idNotificacion', marcarLeidaNotificacion);


export default router;






