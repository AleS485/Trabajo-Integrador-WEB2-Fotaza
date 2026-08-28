import { Notificacion } from '../models/index.js';

export async function crearNotificacion(idUsuarioRecibe, idUsuarioEnvia, idEvento, contenidoNotificacion){
    if(idUsuarioRecibe == idUsuarioEnvia){
        return null;
    }
    try{
        const nuevaNotificacion = await Notificacion.create({
            idUsuarioRecibe, idUsuarioEnvia, idEvento, contenidoNotificacion
        });
        return nuevaNotificacion;
    } catch(error){
        console.error("ERROR REGISTRANDO LA NOTIFICACION: ", error);
        return null;
    }
}


