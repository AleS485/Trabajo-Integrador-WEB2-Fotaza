import { Publicacion, Fotografia } from '../models/index.js'; //index por las relaciones - recordar

export async function obtenerPublicaciones(){
    try{
        const publicacionesTraidas = await Publicacion.findAll({
            include: [Fotografia]
        });

        return publicacionesTraidas;

    } catch(error){
        console.error('Error al traer las publicaciones: ' + error);
        return [];
    }



}















