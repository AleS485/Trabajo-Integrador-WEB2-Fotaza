import { Fotografia, Publicacion, Interes, Chat, Usuario, Mensaje } from '../models/index.js';
import { Op } from 'sequelize';

export async function crearInteres(req, res){
    const idFotografia = req.params.idFotografia;
    const idInteresado = req.session.user.id;
    try{
        const foto = await Fotografia.findOne({
            where:{idFotografia: idFotografia},
            include: [{model: Publicacion}]
        });

        if(!foto){
            return res.status(404).send("NO SE ENCONTRO ESTA FOTOGRAFIA");
        }
        
        const idAutorFoto = foto.Publicacion.idUsuario;

        const [interes, interesCreado] = await Interes.findOrCreate({
            where:{idFotografia: idFotografia, idInteresado: idInteresado}
        });

        const [chat, chatCreado] = await Chat.findOrCreate({
            where:{idInteres: interes.idInteres},
            defaults:{
                idInteres: interes.idInteres,
                idAutorFoto: idAutorFoto,
                idInteresado: idInteresado
            }
        });

        res.redirect("/chats/" + chat.idChat);
    }catch(error){
        console.error("[!] ERROR CREANDO INTERES Y CHAT: ", error);
        return res.status(500).send("ERROR DEL SERVER CREANDO INTERES Y CHAT");
    }
}

export async function cargarChats(req, res){
    const idUsuario = req.session.user.id;
    const {idChat} = req.params;
    try{
        const chats = await Chat.findAll({
            where:{
                [Op.or]: [{idAutorFoto: idUsuario}, {idInteresado:idUsuario}]
            },
            include:[
                {model:Usuario, as: 'vendedor'},
                {model:Usuario, as: 'interesado'}
            ]
        });

        let mensajes = [];

        if(idChat){
            mensajes = await Mensaje.findAll({
                where: {idChat: idChat}
            })
        }
        res.render('chats', {chats, idChat, mensajes});
    } catch(error){
        console.error(error);
        res.status(500).send("ERROR CARGANDOP LOS CHATS");
    }
}

export async function envioMensaje(req, res){
    const {idChat} = req.params;
    const {contenido} = req.body;
    const idUsuarioEmisor = req.session.user.id;

    if(!contenido || !contenido.trim()){
        const chats = await Chat.findAll({
            where:{
                [Op.or]: [{idAutorFoto: idUsuarioEmisor}, {idInteresado:idUsuarioEmisor}]
            },
            include:[
                {model:Usuario, as: 'vendedor'},
                {model:Usuario, as: 'interesado'}
            ]
        });

        const mensajes = await Mensaje.findAll({
            where: { idChat: idChat }
        });

        return res.render('chats',{
            idChat, chats, mensajes,
            alert:{
                status: "error",
                text: "No podes mandar un mensaje vacio"
            }
        })
    }

    try{
        await Mensaje.create({
            idChat: idChat,
            idUsuarioEmisor: idUsuarioEmisor,
            contenido: contenido
        });

        res.redirect('/chats/' + idChat);
    } catch(error){
        console.error(error);
        res.status(500).send("ERROR ENVIANDO EL MENSAJE");
    }
}


