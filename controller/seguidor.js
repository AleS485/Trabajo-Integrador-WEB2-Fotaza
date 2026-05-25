import { Seguidor, Usuario } from '../models/index.js';

export async function obtenerSeguidores(idUsuario){

    try{
        const seguidoresEncontrados = await Seguidor.findAll({
            where: { idUsuarioSeguido: idUsuario}
        });
        const usuariosSeguidores = [];

        for(let seguidor of seguidoresEncontrados){
            const usuario = await Usuario.findByPk(seguidor.idSeguidor);
            if(usuario){
                let fotoUsuario = '';
                if(usuario.avatarUsuario){
                    fotoUsuario = usuario.avatarUsuario.toString('base64');
                }
                
                usuariosSeguidores.push({
                    idUsuario: usuario.idUsuario,
                    nombreUsuario: usuario.nombreUsuario,
                    fotoUsuario: fotoUsuario
                })

            }
        }

        return usuariosSeguidores;


    } catch(error){
        console.error('Error al traer los seguidores del usuario: ', error);
        return [];
    }


}

export async function obtenerSeguidos(idUsuario){

    try{
        const seguidosEncontrados = await Seguidor.findAll({
            where: { idSeguidor: idUsuario}
        });
        const usuariosSeguidos = [];

        for(let seguido of seguidosEncontrados){
            const usuario = await Usuario.findByPk(seguido.idUsuarioSeguido);
            if(usuario){
                let fotoUsuario = '';
                if(usuario.avatarUsuario){
                    fotoUsuario = usuario.avatarUsuario.toString('base64');
                }
                
                usuariosSeguidos.push({
                    idUsuario: usuario.idUsuario,
                    nombreUsuario: usuario.nombreUsuario,
                    fotoUsuario: fotoUsuario
                })

            }
        }

        return usuariosSeguidos;


    } catch(error){
        console.error('Error al traer los seguidos del usuario: ', error);
        return [];
    }


}



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


