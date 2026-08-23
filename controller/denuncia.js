import { Denuncia, Motivo, Fotografia, Publicacion, Usuario, Comentario  } from '../models/index.js';

export async function resolverDenuncia(req, res){
    try{
        const{idDenuncia} = req.params;
        const{decision, observacionValidador} = req.body;

        const denuncia = await Denuncia.findByPk(idDenuncia)

        if(!denuncia){
            return res.status(404).send("ESA DENUNCIA NO EXISTE");
        }

        const cambioEstado = decision == "aceptar" ? 1 : 2;
        
        if(denuncia.idFotografia){
            if(decision == "aceptar"){
                const foto = await Fotografia.findByPk(denuncia.idFotografia);

                if(foto){
                    const publicacion = await Publicacion.findByPk(foto.idPublicacion);
                    if(publicacion){
                        publicacion.isBaja = true;
                        await publicacion.save();
                        await verificarBajas(publicacion.idUsuario);
                    }
                }
            }

            await Denuncia.update(
                {estadoDenuncia: cambioEstado, fechaResolucion: new Date(), observacionValidador},
                {where: {idFotografia: denuncia.idFotografia, estadoDenuncia: 0}}
            );
        }

        if(denuncia.idComentario){
            
            await Denuncia.update(
                {estadoDenuncia: cambioEstado, fechaResolucion: new Date(), observacionValidador},
                {where: {idComentario: denuncia.idComentario, estadoDenuncia: 0}}
            );
            
            if(decision == "aceptar"){
                await Comentario.update(
                    {isBaja: true},
                    {where: {idComentario: denuncia.idComentario}}
                );
            }

            
        }

        res.redirect("/denuncias/reportes");

    } catch(error){
        console.error("ERROR RESOLVIENDO DENUNCIA: " + error);
        res.status(500).send("ERROR AL RESOLVER DENUNCIA");
    }
}

export async function verificarBajas(idUsuario){
    const bajasTotal = await Publicacion.count({
        where:{
            idUsuario: idUsuario,
            isBaja: true
        }
    });

    if(bajasTotal >= 3){
        await Usuario.update({
            estadoUsuario: false,
            fechaDesactivacion: new Date()
        },
        {
            where:{idUsuario: idUsuario}
        });
    }
}

export async function cargarPanelValidador(req, res){
    try{
        const idDenuncia = req.params.idDenuncia;
        let tipoDenuncia = "";
        let previaFoto;
        let textoComentario;

        const denuncia = await Denuncia.findOne({
            where: {idDenuncia: idDenuncia},
            include: [Usuario, Motivo]
        })
        
        if(!denuncia){
            return res.status(404).send("NO EXISTE ESA DENUNCIA");
        }

        if(denuncia.idFotografia){
            tipoDenuncia = 'FOTO';
            const foto = await Fotografia.findOne({
                where: {idFotografia: denuncia.idFotografia}
            });
            previaFoto = foto.urlArchivo.toString('base64');
        } else if(denuncia.idComentario){
            tipoDenuncia = "COMENTARIO";
            const comentario = await Comentario.findOne({
                where: {idComentario: denuncia.idComentario}
            });
            textoComentario = comentario.comentario;
        }

        const datosVista ={
            idDenuncia: denuncia.idDenuncia,
            denunciante: denuncia.Usuario.nombreUsuario,
            motivo: denuncia.Motivo.nombreMotivo,
            justificacion: denuncia.justificacionUsuario,
            fecha: denuncia.fechaDenuncia.toLocaleDateString(),
            tipo: tipoDenuncia,
            previaFoto: previaFoto,
            textoComentario: textoComentario
        }

        res.render('denunciaValidador', {datosVista});

    }catch(error){
        console.error("ERROR EN PANEL VALIDADOR: " + error);
        res.status(500).send("ERROR AL CARGAR DATOS DE DENUNCIA");
    }
}

export async function denunciasPendientes(req, res){
    try{
        const denunciasVista = [];
        const fotosYaDenunciadas = [];
        const comentariosYaDenunciados = [];
        const denunciasPendientes = await Denuncia.findAll({
            where: {estadoDenuncia : 0},
            include: [Usuario, Motivo]
        });

        for(let d of denunciasPendientes){

            if(d.idFotografia){

                if(fotosYaDenunciadas.includes(d.idFotografia)){
                    continue;
                }

                const reportesTotales = await Denuncia.count({
                    where: {idFotografia: d.idFotografia, estadoDenuncia: 0}
                });

                if(reportesTotales < 3){
                    continue
                }

                fotosYaDenunciadas.push(d.idFotografia);
            }

            if(d.idComentario){
                if(comentariosYaDenunciados.includes(d.idComentario)){
                    continue;
                }
                comentariosYaDenunciados.push(d.idComentario);
            }

            denunciasVista.push({
                idDenuncia: d.idDenuncia,
                denunciante: d.Usuario.nombreUsuario,
                motivo: d.Motivo.nombreMotivo,
                tipo: d.idFotografia ? 'Fotografia' : "Comentario",
                fecha: d.fechaDenuncia.toLocaleDateString()
            });
        }
        res.render('reportesValidador', {denunciasVista});

    }catch(error){
        console.error("ERROR LISTANDO DENUNCIAS: " + error);
        res.status(500).send("ERROR EN EL LISTADO DE VALIDADOR");
    }

}

// para fotos

export async function formularioDenunciaFoto(req, res){
    try{
        const {idFotografia} = req.params;
        const motivos = await Motivo.findAll();
        res.render('denuncia',{
            motivos, idFotografia,
            urlAccion: `/denuncias/foto/${idFotografia}`
        });
    } catch(error){
        console.error("ERROR CARGANDO MOTIVOS: " + error);
        res.status(500).send("ERROR EN EL FORMULARIO DE DENUNCIA");
    }
}

export async function crearDenunciarFoto(req, res){
    try{
        const idUsuario = req.session.user.id;
        const {idFotografia} = req.params;
        const {idMotivo, justificacionUsuario} = req.body;
        const [denuncia, creada] = await Denuncia.findOrCreate({
            where: {idFotografia, idUsuario},
            defaults:{
                idMotivo,
                justificacionUsuario,
                estadoDenuncia: 0,
                fechaDenuncia: new Date()
            }
        });

        if(!creada){
            const motivos = await Motivo.findAll();
            return res.status(201).render('denuncia', {
                motivos,
                urlAccion: `/denuncias/foto/${idFotografia}`,
                alert: { 
                    status: "error", 
                    text: "ya hiciste una denuncia en la misma foto" 
                }
            });
        }

        res.redirect("/");
    } catch(error){
        console.error("ERROR REGISTRANDO DENUNCIA: " + error);
        res.status(500).send("ERROR DEL SERVER HACIENDO DENUNCIA");
    }
}

// para comentarios

export async function formularioDenunciaComentario(req, res){
    try{
        const{idComentario} = req.params;
        const motivos = await Motivo.findAll();
        res.render('denuncia',{
            motivos, 
            idComentario,
            urlAccion: `/denuncias/comentario/${idComentario}`
        });
    } catch(error){
        console.error("ERROR CARGANDO MOTIVOS: " + error);
        res.status(500).send("ERROR EN EL FORMULARIO DE DENUNCIA");
    }
}

export async function crearDenunciarComentario(req, res){
    try{
        const idUsuario = req.session.user.id 
        const {idComentario} = req.params;
        const {idMotivo, justificacionUsuario} = req.body;
        const [denuncia, creada] = await Denuncia.findOrCreate({
            where: {idComentario, idUsuario},
            defaults:{
                idMotivo,
                justificacionUsuario,
                estadoDenuncia: 0,
                fechaDenuncia: new Date()
            }
        });

        if(!creada){
            const motivos = await Motivo.findAll();
            return res.status(201).render('denuncia', {
                motivos,
                urlAccion: `/denuncias/foto/${idComentario}`,
                alert: { 
                    status: "error", 
                    text: "ya hiciste una denuncia en este mismo comentario" 
                }
            });
        }

        res.redirect("/");
    } catch(error){
        console.error("ERROR REGISTRANDO DENUNCIA: " + error);
        res.status(500).send("ERROR DEL SERVER HACIENDO DENUNCIA");
    }
}













