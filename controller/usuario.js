import { Usuario } from '../models/index.js';



export async function obtenerUsuario(id){

    try{
        const usuarioBuscado = await Usuario.findByPk(id);
        return usuarioBuscado;
    } catch(error){
        console.error("Error al buscar a ese usuario: ", error);
        return null;
    }

}
