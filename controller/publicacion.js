import { Publicacion, Fotografia, Comentario, Usuario, PublicacionEtiqueta, Etiqueta, Valoracion } from '../models/index.js'; //index por las relaciones - recordar


export async function obtenerDatosDePublicacion(idPublicacion){

    try{
        const publicacion = await Publicacion.findByPk(idPublicacion);
        if(!publicacion){
            return null;
        }

        const autor = await Usuario.findByPk(publicacion.idUsuario);
        let avatarAutor = '';
        if(autor.avatarUsuario){
            avatarAutor = autor.avatarUsuario.toString('base64');
        }

        const etiquetasAsociadas = await PublicacionEtiqueta.findAll({
            where: {idPublicacion: idPublicacion}
        });

        const listaEtiquetas = [];
        for(let asociada of etiquetasAsociadas){
            const etiqueta = await Etiqueta.findByPk(asociada.idEtiqueta);
            listaEtiquetas.push(etiqueta.nombreEtiqueta);
        }

        const fotosBuscadas = await Fotografia.findAll({
            where: {idPublicacion: idPublicacion}
        });

        const listaFotos = []; 
        for(let foto of fotosBuscadas){ 

            let fotoPreparada = foto.urlArchivo.toString('base64');
            const comentariosBuscados = await Comentario.findAll({
                where: {idFotografia: foto.idFotografia}
            });

            const listaComentariosFoto = [];
            for(let comentario of comentariosBuscados){
                const usuarioQueComenta = await Usuario.findByPk(comentario.idUsuario);
                let avatarComentador = '';
                if(usuarioQueComenta.avatarUsuario){
                    avatarComentador = usuarioQueComenta.avatarUsuario.toString('base64');
                }

                listaComentariosFoto.push({
                    texto: comentario.comentario,
                    fecha: comentario.fechaComentario.toLocaleDateString(),
                    nombreUsuario: usuarioQueComenta.nombreUsuario,
                    avatarUsuario: avatarComentador,
                    idUsuario: usuarioQueComenta.idUsuario
                });

            }

            const valoracionesDeFoto = await Valoracion.findAll({
                where: { idFotografia: foto.idFotografia}
            })

            let cantidadValoraciones = valoracionesDeFoto.length;
            let promedioTotalValoraciones = 0;

            //asi no divido por 0
            if(cantidadValoraciones > 0){
                let sumaValoraciones = 0;
                for(let valoracion of valoracionesDeFoto){
                    sumaValoraciones += valoracion.valoracionPublicacion;
                }
                promedioTotalValoraciones = (sumaValoraciones/cantidadValoraciones).toFixed(1);
            }



            listaFotos.push({
                idFotografia: foto.idFotografia,
                urlArchivo: fotoPreparada,
                isCopyright: foto.isCopyright,
                comentarios: listaComentariosFoto,
                cantidadValoraciones: cantidadValoraciones,
                promedioValoraciones: promedioTotalValoraciones
            })
        }

        let totalValoracionesInicio;
        let promedioValoracionesInicio;

        if(listaFotos.length > 0){
            totalValoracionesInicio = listaFotos[0].cantidadValoraciones;
            promedioValoracionesInicio = listaFotos[0].promedioValoraciones;
        } else{
            totalValoracionesInicio = 0;
            promedioValoracionesInicio = 0;
        }




        return{
            idUsuario: publicacion.idUsuario,
            titulo: publicacion.tituloPublicacion,
            descripcion: publicacion.descripcionPublicacion,
            fecha: publicacion.fechaPublicacion.toLocaleDateString(),
            autor: autor.nombreUsuario,
            avatarAutor: avatarAutor,
            etiquetas: listaEtiquetas,
            fotos: listaFotos,
            cantidadValoracionesInicio: totalValoracionesInicio,
            promedioValoracionesInicio: promedioValoracionesInicio
        }



    }catch(error){
        console.error('Error consiguiendo los datos de esta publicacion: ', error);
        return null;
    }






}










export async function obtenerPublicaciones(){
    try{
        const publicacionesTraidas = await Publicacion.findAll({
            include: Fotografia
        });

        return publicacionesTraidas;

    } catch(error){
        console.error('Error al traer las publicaciones: ' + error);
        return [];
    }



}















