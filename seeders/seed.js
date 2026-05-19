import fs from 'fs';
import path from "path";
import sequelize from "../models/config.js";
//modelos
import { Usuario } from "../models/Usuario.js";
import { Publicacion } from "../models/Publicacion.js";
import { Fotografia } from "../models/Fotografia.js";
import { Comentario } from "../models/Comentario.js";
import { Valoracion } from "../models/Valoracion.js";
import { Seguidor } from "../models/Seguidor.js";




async function seed() {
    try{

        await sequelize.sync({ alter: true });

        const avatarbase64 = fs.readFileSync(path.resolve('./seeders/imgPruebas/avatarprueba.txt'), 'utf-8');
        const bufferImagenPrueba = Buffer.from(avatarbase64, 'base64');

        const avatarsegundobase64 = fs.readFileSync(path.resolve('./seeders/imgPruebas/avatarprueba2.txt'), 'utf-8');
        const bufferImagenPrueba2 = Buffer.from(avatarsegundobase64, 'base64');

        const fotografiabase64 = fs.readFileSync(path.resolve('./seeders/imgPruebas/imagenPrueba.txt'), 'utf-8');
        const bufferFotografia = Buffer.from(fotografiabase64, 'base64');


        const usuarios = await Usuario.bulkCreate([
            {
                nombreUsuario: "Rice",
                apellidoUsuario: "Shower",
                passwordUsuario: "123",
                email: "riceshower@gmail.com",
                avatarUsuario: bufferImagenPrueba,
                isValidador: false
            },
            {
                nombreUsuario: "Kiryu",
                apellidoUsuario: "Kazuma",
                passwordUsuario: "123",
                email: "kiryukazuma@gmail.com",
                avatarUsuario: bufferImagenPrueba2,
                isValidador: false
            }
        ]);

        const publicaciones = await Publicacion.bulkCreate([
        {
            tituloPublicacion: "Atardecer en el hipodromo",
            descripcionPublicacion: "esto es una prueba para la descripcion de la publicacion",
            idUsuario: usuarios[0].idUsuario 
        },
        {
            tituloPublicacion: "Noche en Kamurocho",
            descripcionPublicacion: "esto tambien es otra prueba para la descripcion de la publicacion",
            idUsuario: usuarios[1].idUsuario 
        }
        ]);

        const fotos = await Fotografia.bulkCreate([
        {
            idPublicacion: publicaciones[0].idPublicacion,
            urlArchivo: bufferFotografia, 
            isCopyright: false
        },
        {
            idPublicacion: publicaciones[1].idPublicacion, 
            urlArchivo: bufferFotografia, 
            isCopyright: false
        }
        ]);

        await Comentario.bulkCreate([
        { 
            comentario: "Banque la foto esta muy buena, me gusto", 
            idUsuario: usuarios[1].idUsuario, 
            idFotografia: fotos[0].idFotografia 
        },
        { 
            comentario: "Esta muy bueno Kamurocho, tambien me gusto una banda", 
            idUsuario: usuarios[0].idUsuario, 
            idFotografia: fotos[1].idFotografia 
        }
        ]);

        await Valoracion.bulkCreate([
        { 
            valoracionPublicacion: 5, 
            idUsuario: usuarios[1].idUsuario, 
            idFotografia: fotos[0].idFotografia 
        },
        { 
            valoracionPublicacion: 4, 
            idUsuario: usuarios[0].idUsuario, 
            idFotografia: fotos[1].idFotografia 
        }
        ]);

        await Seguidor.bulkCreate([
        { 
            idUsuarioSeguido: usuarios[0].idUsuario, 
            idSeguidor: usuarios[1].idUsuario 
        },
        { 
            idUsuarioSeguido: usuarios[1].idUsuario, 
            idSeguidor: usuarios[0].idUsuario 
        }
        ]);

        console.log("[+] Seed cargado correctamente");

    } catch(err){
        console.error("[-] Error al cargar el seed de la base de datos de prueba" + err);

    }

}

seed();



