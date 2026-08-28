import { Notificacion, Usuario } from "../models/index.js";


export async function marcarLeidaNotificacion(req, res){
    const {idNotificacion} = req.params;
    try{
        await Notificacion.update({
            estadoLectura: true, fechaLectura: new Date()
        }, 
        {where: {idNotificacion: idNotificacion}})
        
        res.redirect('/notificaciones');
    } catch(error){
        console.error("ERROR MARCANDO NOTIFICACION COMO LEIDA: ", error);
        res.status(500).send("ERROR DEL SERVER MARCANDO NOTIFICACION LEIDA");
    }
}

export async function listarNotificaciones(req, res) {
    try{
        const idUsuarioLogueado = req.session.user.id;
        const notificaciones = await Notificacion.findAll({
            where: {idUsuarioRecibe: idUsuarioLogueado},
            include: [{
                model: Usuario,
                as: 'usuarioEnvia',
                attributes: ['nombreUsuario']
            }],
            order: [['fechaNotificacion', 'DESC']]
        })

        res.render('notificaciones', {notificaciones});
    } catch(error){
        console.error("ERROR LISTANDO LAS NOTIFICACIONES: ", error);
        res.status(500).send("ERROR DEL SERVER CARGANDO NOTIFICACIONES");
    }
}





