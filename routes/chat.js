import { Router } from "express"
import { cargarChats, crearInteres, envioMensaje } from "../controller/chat.js";

// /chats
const router = Router()

router.get("/", cargarChats);

router.get("/:idChat", cargarChats);

router.post("/interes/:idFotografia", crearInteres);

router.post("/:idChat/mensaje", envioMensaje);


export default router;






