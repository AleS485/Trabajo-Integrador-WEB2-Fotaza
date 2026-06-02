import { Seguidor, Usuario } from '../models/index.js';


export async function verificarSiLoSigue(idSeguidor, idUsuarioSeguido){
    try{
        const verificacionSeguidor = await Seguidor.findOne({
            where:{
                idSeguidor: idSeguidor,
                idUsuarioSeguido: idUsuarioSeguido
            }
        })

        if(verificacionSeguidor){
            return true;
        } else{
            return false;
        }



    } catch(error){
        console.error("ERROR VERIFICANDO SI EXISTE SEGUIMIENTO: ", error);
        return false;
    }
}

export async function seguirUsuario(req, res){

    try{
        const idUsuarioSeguido = req.params.id;
        const idSeguidor = req.session.user.id;

        if(idSeguidor == idUsuarioSeguido){
            return res.status(400).send("NO TE PODES SEGUIR A VOS MISMO");
        }

        await Seguidor.create({
            idSeguidor: idSeguidor,
            idUsuarioSeguido: idUsuarioSeguido
        })

        return res.redirect(`/perfil/${idUsuarioSeguido}`)

    } catch(error){
        console.error("ERROR SIGUIENDO USUARIO: ", error);
        return res.status(500).send('ERROR DEL SERVIDOR PROCESANDO EL SEGUIMIENTO');
    }



}


export async function dejarSeguirUsuario(req, res) {
    
    try {
        const idUsuarioSeguido = req.params.id;
        const idSeguidor = req.session.user.id;

        await Seguidor.destroy({
            where: {
                idSeguidor: idSeguidor,
                idUsuarioSeguido: idUsuarioSeguido
            }
        });

        return res.redirect(`/perfil/${idUsuarioSeguido}`);
    } catch (error) {
        console.error('ERROR AL DEJAR DE SEGUIR: ', error);
        return res.status(500).send("ERROR DEL SERVIDOR AL INTENTAR BORRAR SEGUIMIENTO");
    
    }

}




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


