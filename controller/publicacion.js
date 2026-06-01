import { Publicacion, Fotografia, Comentario, Usuario, PublicacionEtiqueta, Etiqueta, Valoracion, MarcaDeAgua } from '../models/index.js'; //index por las relaciones - recordar
import sharp from 'sharp';

export async function obtenerDatosParaEditar(req, res){

    try{
        const idPublicacion = req.params.id;

        const publicacionBuscada = await obtenerDatosDePublicacion(idPublicacion);

        if(!publicacionBuscada){
            return res.status(404).send('No se encontro la publicacion para editar');
        }

        return res.render('editar_publicacion', {publicacion: publicacionBuscada});

    }catch(error){
        console.error("Error al cargar la vista de editar publicacion ", error);
        return res.status(500).send('Error del servidor');
    }



}

export async function actualizarPublicacion(req, res){
    try{
        const idPublicacion = req.params.id;
        const {titulo, descripcion, etiquetas, imgs} = req.body;

        await Publicacion.update({
            tituloPublicacion: titulo,
            descripcionPublicacion: descripcion
        },
        { where: {idPublicacion: idPublicacion}}
        )

        await PublicacionEtiqueta.destroy({
            where: { idPublicacion: idPublicacion }
        })

        if (etiquetas && etiquetas.length > 0) {
            for (let etiquetaReagregada of etiquetas) {
                const [etiqueta, etiquetaSeCreo] = await Etiqueta.findOrCreate({
                    where: { nombreEtiqueta: etiquetaReagregada }
                });

                await PublicacionEtiqueta.create({
                    idPublicacion: idPublicacion,
                    idEtiqueta: etiqueta.idEtiqueta
                });
            }
        }

        await Fotografia.destroy({
            where: { idPublicacion: idPublicacion }
        });

        if (imgs && imgs.length > 0) {
            for (let img of imgs) {
                let codigoBase64 = '';

                if (img.src.includes(',')) {
                    const textBase64 = img.src.split(',');
                    codigoBase64 = textBase64[1];
                } else {
                    codigoBase64 = img.src;
                }

                let imgBuffer = Buffer.from(codigoBase64, 'base64');

                await Fotografia.create({
                    idPublicacion: idPublicacion,
                    urlArchivo: imgBuffer,
                    isCopyright: false 
                });
            }
        }

        return res.status(200).send('SE MODIFICO LA PUBLICACION CORRECTAMENTE');








    } catch(error){
        console.error('ERROR EN LA MODIFICACION DE LA PUBLICACION: ', error);


    }




}


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
            idPublicacion: idPublicacion,
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


export async function crearPublicacion(req, res){
    try{

        if (!req.session || !req.session.user) {
            return res.status(401).send("TENES QUE INICIAR SESION");
        }

        const titulo = req.body.titulo;
        const descripcion = req.body.descripcion;
        const etiquetas = req.body.etiquetas;
        const imgs = req.body.imgs;
        const marcaAgua = req.body.marcaAgua;
        const confirmacionCopyright = req.body.confirmacionCopyright;

        const nuevaPublicacion = await Publicacion.create({
            idUsuario: req.session.user.id, 
            tituloPublicacion: titulo,
            descripcionPublicacion: descripcion
            
        })

        const idPublicacionCreada = nuevaPublicacion.idPublicacion;

        if(etiquetas && etiquetas.length > 0){
            for(let etiquetaAgregada of etiquetas){
                const [etiqueta, etiquetaSeCreo] = await Etiqueta.findOrCreate({
                    where: {nombreEtiqueta: etiquetaAgregada}
                });

                await PublicacionEtiqueta.create({
                    idPublicacion: idPublicacionCreada,
                    idEtiqueta: etiqueta.idEtiqueta
                })


            }
        }

        if(imgs && imgs.length > 0){
            for(let img of imgs){

                const textBase64 = img.src.split(',');
                const codigoBase64 = textBase64[1];
            
                let imgBuffer = Buffer.from(codigoBase64, 'base64');

                if(confirmacionCopyright && img.isCopyright){
                    
                    

                    const textoImagen = await sharp({ text: { text: `<span foreground="white" weight="bold">${marcaAgua}</span>`, rgba: true, dpi: 450, font: 'Arial Black' } }).png().toBuffer();

                    
                    imgBuffer = await sharp(imgBuffer)
                    .composite([{ input: textoImagen, top: 150, left: 150 }])
                    .toBuffer();






                }

                await Fotografia.create({
                    idPublicacion: idPublicacionCreada,
                    urlArchivo: imgBuffer,
                    isCopyright: img.isCopyright ? true : false
                })

            
            }
        }


        return res.status(201).send("PUBLICACION CREADA CORRECTAMENTE");

    } catch(error){
        console.error('ERROR CREANDO PUBLICACION: ', error);
        
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















