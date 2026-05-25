import { Seguidor } from '../models/index.js';

export async function contadorSeguidores(idUsuario){

    try{
        const seguidoresContados = await Seguidor.count({
            where: { idUsuarioSeguido: idUsuario }
        });

        return seguidoresContados;
    } catch(error){
        console.error('Error contando los seguidores del usuario: ', error);
        return 0;
    }


}


export async function contadorSeguidos(idUsuario){

    try{
        const seguidosContados = await Seguidor.count({
            where: { idSeguidor: idUsuario }
        });

        return seguidosContados;
    } catch(error){
        console.error('Error contando los seguidos del usuario: ', error);
        return 0;
    }


}


