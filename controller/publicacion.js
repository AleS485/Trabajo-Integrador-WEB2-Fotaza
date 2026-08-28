import { Denuncia, Publicacion, Fotografia, Comentario, Usuario, PublicacionEtiqueta, Etiqueta, Valoracion, MarcaDeAgua } from '../models/index.js'; //index por las relaciones - recordar
import { crearNotificacion } from '../helpers/notificacion.js';
import { Op } from 'sequelize';
import sharp from 'sharp';


export async function valorarFoto(req, res){
    try{
        const idPublicacion = req.params.idPublicacion;
        const idUsuarioLogueado = req.session.user.id;
        const idFotografia = req.body.idFotografia;
        const puntuacionEnviada = req.body.valoracionPublicacion;

        // mando alerta del profe si llega a estar vacia
        if(!puntuacionEnviada){ 
            const publicacionReenviada = await obtenerDatosDePublicacion(idPublicacion);
            return res.status(400).render('publicacion', {
                publicacion: publicacionReenviada,
                alert:{
                    status: "error",
                    text: "NO PODES VOTAR SIN ELEGIR UN PUNTAJE"
                }
            });
        }
        // mando alerta del profe si autor quiere votar
        const publicacionValidacionAutor = await Publicacion.findByPk(idPublicacion); 
        if(publicacionValidacionAutor.idUsuario == idUsuarioLogueado){
            const publicacionReenviada = await obtenerDatosDePublicacion(idPublicacion);
            return res.status(400).render('publicacion', {
                publicacion: publicacionReenviada,
                alert:{
                    status: "error",
                    text: "SOS EL AUTOR, NO PODES VALORIZAR TU PROPIA IMAGEN"
                }
            });
        }
        
        const unicoVoto = await Valoracion.findOne({
            where: {
                idUsuario: idUsuarioLogueado,
                idFotografia: idFotografia
            }
        });

        // mando alerta del profe si usuario ya voto
        if (unicoVoto) {
            const publicacionReenviada = await obtenerDatosDePublicacion(idPublicacion);
            return res.status(400).render('publicacion', {
                publicacion: publicacionReenviada,
                alert: {
                    status: "error",
                    text: "NO PODES VALORIZAR UNA IMAGEN MAS DE UNA VEZ"
                }
            });
        }

        await Valoracion.create({
            idUsuario: idUsuarioLogueado,
            idFotografia: idFotografia,
            valoracionFotografia: parseInt(puntuacionEnviada)
        });

        // agrego helper de notificaacion
        await crearNotificacion(publicacionValidacionAutor.idUsuario, idUsuarioLogueado, 2, " te valoro tu fotografia");

        return res.redirect("/publicaciones/" + idPublicacion);

    } catch(error){
        console.error("ERROR AL GUARDAR LA VALORACION: ", error);
        return res.status(500).send("ERROR INTERNO AL VALORIZAR LA FOTO");
    }
}

export async function borrarComentario(req, res){
    try{
        const idComentario = req.params.idComentario;
        const idPublicacion = req.params.idPublicacion;
        const comentarioValidacion = await Comentario.findByPk(idComentario);

        if(comentarioValidacion){
            await comentarioValidacion.destroy();
        }

        return res.redirect("/publicaciones/" + idPublicacion);

    } catch(error){
        console.error("ERROR AL QUERER BORRAR COMENTARIO:", error);
        return res.status(500).send("ERROR DEL SERVIDOR QUERIENDO BORRAR UN COMENTARIO");
    }
}

export async function cambiarEstadoComentarios(req, res){
    try{
        const idPublicacion = req.params.idPublicacion;
        const idUsuarioLogueado = req.session.user.id;
        const publicacionValidacion = await Publicacion.findByPk(idPublicacion);

        if(!publicacionValidacion){
            return res.status(404).send("ESTA PUBLICACION NO EXISTE");
        }

        if(publicacionValidacion.idUsuario !== idUsuarioLogueado){
            return res.status(403).send("NO SOS EL AUTOR DE LA PUBLICACION, POR LO TANTO NO PODES HACER ESTO"); 
        }

        let cambioEstado

        if(publicacionValidacion.isCerrado == true){
            cambioEstado = false;
        } else{
            cambioEstado = true;
        }

        await Publicacion.update(
            {isCerrado: cambioEstado},
            {where: {idPublicacion: idPublicacion}}
        )

        return res.redirect("/publicaciones/" + idPublicacion);

    } catch(error){
        console.error("ERROR CAMBIANDO EL ESTADO DE COMENTARIOS: ", error);
        return res.status(500).send("ERROR DEL SERVIDOR CAMBIANDO EL ESTADO DE LOS COMENTARIOS");
    }
}

export async function agregarComentario(req, res){
    try{
        const idPublicacion = req.params.idPublicacion;
        const idFotografia = req.body.idFotografia;
        const textoComentario = req.body.comentario;
        const idUsuarioLogueado = req.session.user.id;

        if(!textoComentario || textoComentario.trim() == ""){
            return res.status(400).send("EL COMENTARIO NO DEBE ESTAR VACIO");
        }

        if(textoComentario.length > 250){
            return res.status(400).send("TU COMENTARIO ES MUY LARGO (SOLO HASTA 250 CARACTERES)");
        }

        await Comentario.create({
            idFotografia: idFotografia,
            idUsuario: idUsuarioLogueado,
            comentario: textoComentario
        })

        // meto el helper de notificacion

        const publicacion = await Publicacion.findByPk(idPublicacion);
        await crearNotificacion(publicacion.idUsuario, idUsuarioLogueado, 1, " te comento en tu publicacion");

        return res.redirect("/publicaciones/" + idPublicacion);

    } catch(error){
        console.error("ERROR AGREGANDO COMENTARIO: ", error);
        return res.status(500).send("ERROR DEL SERVIDOR GUARDANDO EL COMENTARIO");
    }
}

export async function eliminarPublicacion(req, res){
    try{
        const idPublicacionBuscada = req.params.id;
        const usuarioLogueado = req.session.user.id;
        const publicacion = await Publicacion.findByPk(idPublicacionBuscada);

        if(!publicacion){
            return res.status(404).send("LA PUBLICACION A ELIMINAR NO SE HA ENCONTRADO");
        }

        if(usuarioLogueado !== publicacion.idUsuario){
            return res.status(403).send("NO SOS EL CREADOR DE ESTA PUBLICACION, POR LO TANTO NO PODES BORRARLA");
        }
        
        await publicacion.destroy();

        return res.redirect("/");

    } catch(error){
        console.error("[-] ERROR AL BORRAR PUBLICACION: ", error );
        return res.status(500).send("ERROR INTERNO DEL SERVER AL BORRAR");
    }
}

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

        // guardo datos para que no se borre en bd
        const fotosAntes = await Fotografia.findAll({
            where: {idPublicacion: idPublicacion}
        })

        const idFotosAntes = [];
        for(let foto of fotosAntes){
            idFotosAntes.push(foto.idFotografia);
        }

        const marcasAguaAntes = await MarcaDeAgua.findAll({
            where: {idFotografia: {[Op.in]: idFotosAntes}}
        })

        let textoMarcaGuardado = null;

        if(marcasAguaAntes.length > 0){
            textoMarcaGuardado = marcasAguaAntes[0].contenidoMarca;
        } 

        await PublicacionEtiqueta.destroy({
            where: { idPublicacion: idPublicacion }
        })

        await Fotografia.destroy({
            where: { idPublicacion: idPublicacion }
        });

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

                const fotoRecreada = await Fotografia.create({
                    idPublicacion: idPublicacion,
                    urlArchivo: imgBuffer,
                    isCopyright: img.isCopyright ? true : false
                });
                if(textoMarcaGuardado && img.isCopyright){
                    await MarcaDeAgua.create({
                        idFotografia: fotoRecreada.idFotografia,
                        contenidoMarca: textoMarcaGuardado
                    })
                }
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
        const idFotos = [];
        for(let foto of fotosBuscadas){ 
            idFotos.push(foto.idFotografia);
            let fotoPreparada = foto.urlArchivo.toString('base64');
            const comentariosBuscados = await Comentario.findAll({
                where: {idFotografia: foto.idFotografia, isBaja: false}
            });

            const listaComentariosFoto = [];
            for(let comentario of comentariosBuscados){
                const usuarioQueComenta = await Usuario.findByPk(comentario.idUsuario);
                listaComentariosFoto.push({
                    idComentario: comentario.idComentario,
                    texto: comentario.comentario,
                    fecha: comentario.fechaComentario.toLocaleDateString(),
                    nombreUsuario: usuarioQueComenta.nombreUsuario,
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
                    sumaValoraciones += valoracion.valoracionFotografia;
                }
                promedioTotalValoraciones = (sumaValoraciones/cantidadValoraciones).toFixed(1);
            }

            listaFotos.push({
                idFotografia: foto.idFotografia,
                urlArchivo: fotoPreparada,
                comentarios: listaComentariosFoto,
                cantidadValoraciones: cantidadValoraciones,
                promedioValoraciones: promedioTotalValoraciones,
                isCopyright: foto.isCopyright
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

        //agregado para las denuncias

        let denunciasDeFoto = 0;
        if(idFotos.length > 0){
            denunciasDeFoto = await Denuncia.count({
                where:{
                    idFotografia: idFotos,
                    estadoDenuncia: 0
                }
            });
        }
        let puedeEditar;

        if(denunciasDeFoto == 0){
            puedeEditar = true;
        } else{
            puedeEditar = false;
        }

        return{
            idPublicacion: idPublicacion,
            idUsuario: publicacion.idUsuario,
            titulo: publicacion.tituloPublicacion,
            descripcion: publicacion.descripcionPublicacion,
            fecha: publicacion.fechaPublicacion.toLocaleDateString(),
            autor: autor.nombreUsuario,
            etiquetas: listaEtiquetas,
            fotos: listaFotos,
            cantidadValoracionesInicio: totalValoracionesInicio,
            promedioValoracionesInicio: promedioValoracionesInicio,
            isCerrado: publicacion.isCerrado,
            puedeEditar: puedeEditar
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
                let flagMarcaDeAguaBD = false;

                if(confirmacionCopyright && img.isCopyright){
                    const textoImagen = await sharp({ text: { text: `<span foreground="white" weight="bold">${marcaAgua}</span>`, rgba: true, dpi: 450, font: 'Arial Black' } }).png().toBuffer();
                    imgBuffer = await sharp(imgBuffer)
                    .composite([{ input: textoImagen, top: 150, left: 150 }])
                    .toBuffer();
                    flagMarcaDeAguaBD = true;
                }

                const fotoCreada = await Fotografia.create({
                    idPublicacion: idPublicacionCreada,
                    urlArchivo: imgBuffer,
                    isCopyright: img.isCopyright ? true : false
                })

                if(flagMarcaDeAguaBD && marcaAgua){
                    await MarcaDeAgua.create({
                        idFotografia: fotoCreada.idFotografia,
                        contenidoMarca: marcaAgua
                    })
                }
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
            where:{isBaja: false},
            include: Fotografia
        });

        return publicacionesTraidas;

    } catch(error){
        console.error('Error al traer las publicaciones: ' + error);
        return [];
    }
}
