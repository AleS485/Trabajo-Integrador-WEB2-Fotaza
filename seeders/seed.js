import fs from 'fs';
import path from "path";
import sequelize from "../models/config.js";
//modelos
import { Usuario } from "../models/Usuario.js";
import { Rol } from '../models/Rol.js';
import { RolUsuario } from '../models/RolUsuario.js';
import { Publicacion } from "../models/Publicacion.js";
import { Fotografia } from "../models/Fotografia.js";
import { Comentario } from "../models/Comentario.js";
import { Valoracion } from "../models/Valoracion.js";
import { Seguidor } from "../models/Seguidor.js";
import { Etiqueta } from "../models/Etiqueta.js";
import { PublicacionEtiqueta} from "../models/PublicacionEtiqueta.js";
import { Motivo } from "../models/Motivo.js";

async function seed() {
    try {
        await sequelize.sync({ force: true });

        const avatarbase641 = fs.readFileSync(path.resolve('./seeders/imgPruebas/1.txt'), 'utf-8');
        const bufferImagenPrueba1 = Buffer.from(avatarbase641, 'base64');

        const avatarbase642 = fs.readFileSync(path.resolve('./seeders/imgPruebas/2.txt'), 'utf-8');
        const bufferImagenPrueba2 = Buffer.from(avatarbase642, 'base64');

        const avatarbase643 = fs.readFileSync(path.resolve('./seeders/imgPruebas/3.txt'), 'utf-8');
        const bufferImagenPrueba3 = Buffer.from(avatarbase643, 'base64');

        const avatarbase644 = fs.readFileSync(path.resolve('./seeders/imgPruebas/4.txt'), 'utf-8');
        const bufferImagenPrueba4 = Buffer.from(avatarbase644, 'base64');

        const avatarbase645 = fs.readFileSync(path.resolve('./seeders/imgPruebas/5.txt'), 'utf-8');
        const bufferImagenPrueba5 = Buffer.from(avatarbase645, 'base64');

        const avatarbase646 = fs.readFileSync(path.resolve('./seeders/imgPruebas/6.txt'), 'utf-8');
        const bufferImagenPrueba6 = Buffer.from(avatarbase646, 'base64');

        const avatarbase647 = fs.readFileSync(path.resolve('./seeders/imgPruebas/7.txt'), 'utf-8');
        const bufferImagenPrueba7 = Buffer.from(avatarbase647, 'base64');

        const avatarbase648 = fs.readFileSync(path.resolve('./seeders/imgPruebas/8.txt'), 'utf-8');
        const bufferImagenPrueba8 = Buffer.from(avatarbase648, 'base64');


        const roles = await Rol.bulkCreate([
            { nombreRol: "Usuario" },
            { nombreRol: "Validador"}
        ]);


        const usuarios = await Usuario.bulkCreate([
            { nombreUsuario: "kiryu", apellidoUsuario: "kazuma", passwordUsuario: "12345", email: "kiryu@gmail.com", avatarUsuario: bufferImagenPrueba1 },
            { nombreUsuario: "albert", apellidoUsuario: "wesker", passwordUsuario: "12345", email: "wesker@gmail.com", avatarUsuario: bufferImagenPrueba2 },
            { nombreUsuario: "vergil", apellidoUsuario: "sparda", passwordUsuario: "12345", email: "vergil@gmail.com", avatarUsuario: bufferImagenPrueba3 },
            { nombreUsuario: "batman", apellidoUsuario: "wayne", passwordUsuario: "12345", email: "batman@gmail.com", avatarUsuario: bufferImagenPrueba4 },
            { nombreUsuario: "solid", apellidoUsuario: "snake", passwordUsuario: "12345", email: "snake@gmail.com", avatarUsuario: bufferImagenPrueba5 },
            { nombreUsuario: "cliff", apellidoUsuario: "unger", passwordUsuario: "12345", email: "cliff@gmail.com", avatarUsuario: bufferImagenPrueba6 },
            { nombreUsuario: "sam", apellidoUsuario: "bridges", passwordUsuario: "12345", email: "sam@gmail.com", avatarUsuario: bufferImagenPrueba7 }
        ], {individualHooks: true});

        await RolUsuario.bulkCreate([
            { idUsuario: usuarios[0].idUsuario, idRol: roles[0].idRol },
            { idUsuario: usuarios[1].idUsuario, idRol: roles[1].idRol },
            { idUsuario: usuarios[2].idUsuario, idRol: roles[0].idRol },
            { idUsuario: usuarios[3].idUsuario, idRol: roles[0].idRol },
            { idUsuario: usuarios[4].idUsuario, idRol: roles[0].idRol },
            { idUsuario: usuarios[5].idUsuario, idRol: roles[0].idRol },
            { idUsuario: usuarios[6].idUsuario, idRol: roles[0].idRol }
        ])


        const etiquetas = await Etiqueta.bulkCreate([
            { nombreEtiqueta: "juegos" },
            { nombreEtiqueta: "comics" },
            { nombreEtiqueta: "accion" },
            { nombreEtiqueta: "noche" },
            { nombreEtiqueta: "espada" },
            { nombreEtiqueta: "sigilo" },
            { nombreEtiqueta: "playa" },
            { nombreEtiqueta: "ciudad" },
            { nombreEtiqueta: "test" }
        ]);

        const publicaciones = await Publicacion.bulkCreate([
            { tituloPublicacion: "prueba 1", descripcionPublicacion: "test de post", idUsuario: usuarios[0].idUsuario },
            { tituloPublicacion: "prueba 2", descripcionPublicacion: "test de post", idUsuario: usuarios[0].idUsuario },
            { tituloPublicacion: "prueba 3", descripcionPublicacion: "test de post", idUsuario: usuarios[2].idUsuario },
            { tituloPublicacion: "prueba 4", descripcionPublicacion: "test de post", idUsuario: usuarios[3].idUsuario },
            { tituloPublicacion: "prueba 5", descripcionPublicacion: "test de post", idUsuario: usuarios[4].idUsuario },
            { tituloPublicacion: "prueba 6", descripcionPublicacion: "test de post", idUsuario: usuarios[5].idUsuario },
            { tituloPublicacion: "prueba 7", descripcionPublicacion: "test de post", idUsuario: usuarios[6].idUsuario },
            { tituloPublicacion: "prueba 8", descripcionPublicacion: "test de post", idUsuario: usuarios[0].idUsuario },
            { tituloPublicacion: "prueba 9", descripcionPublicacion: "test de post", idUsuario: usuarios[0].idUsuario }
        ]);

        const fotos = await Fotografia.bulkCreate([
            // 3 fotos
            { idPublicacion: publicaciones[0].idPublicacion, urlArchivo: bufferImagenPrueba1, isCopyright: false },
            { idPublicacion: publicaciones[0].idPublicacion, urlArchivo: bufferImagenPrueba2, isCopyright: false },
            { idPublicacion: publicaciones[0].idPublicacion, urlArchivo: bufferImagenPrueba3, isCopyright: false },
            // 2 fotos
            { idPublicacion: publicaciones[1].idPublicacion, urlArchivo: bufferImagenPrueba4, isCopyright: false },
            { idPublicacion: publicaciones[1].idPublicacion, urlArchivo: bufferImagenPrueba5, isCopyright: false },
            //
            { idPublicacion: publicaciones[2].idPublicacion, urlArchivo: bufferImagenPrueba5, isCopyright: false },
            { idPublicacion: publicaciones[3].idPublicacion, urlArchivo: bufferImagenPrueba6, isCopyright: false },
            { idPublicacion: publicaciones[4].idPublicacion, urlArchivo: bufferImagenPrueba7, isCopyright: false },
            { idPublicacion: publicaciones[5].idPublicacion, urlArchivo: bufferImagenPrueba8, isCopyright: false },
            { idPublicacion: publicaciones[6].idPublicacion, urlArchivo: bufferImagenPrueba1, isCopyright: false },
            { idPublicacion: publicaciones[7].idPublicacion, urlArchivo: bufferImagenPrueba2, isCopyright: false },
            { idPublicacion: publicaciones[8].idPublicacion, urlArchivo: bufferImagenPrueba3, isCopyright: false }
        ]);

        
        await PublicacionEtiqueta.bulkCreate([
            { idPublicacion: publicaciones[0].idPublicacion, idEtiqueta: etiquetas[0].idEtiqueta },
            { idPublicacion: publicaciones[1].idPublicacion, idEtiqueta: etiquetas[1].idEtiqueta },
            { idPublicacion: publicaciones[2].idPublicacion, idEtiqueta: etiquetas[2].idEtiqueta },
            { idPublicacion: publicaciones[3].idPublicacion, idEtiqueta: etiquetas[3].idEtiqueta },
            { idPublicacion: publicaciones[4].idPublicacion, idEtiqueta: etiquetas[4].idEtiqueta },
            { idPublicacion: publicaciones[5].idPublicacion, idEtiqueta: etiquetas[5].idEtiqueta },
            { idPublicacion: publicaciones[6].idPublicacion, idEtiqueta: etiquetas[6].idEtiqueta },
            { idPublicacion: publicaciones[7].idPublicacion, idEtiqueta: etiquetas[7].idEtiqueta },
            { idPublicacion: publicaciones[8].idPublicacion, idEtiqueta: etiquetas[8].idEtiqueta }
        ]);

        
        await Comentario.bulkCreate([
            { comentario: "buena foto", idUsuario: usuarios[2].idUsuario, idFotografia: fotos[0].idFotografia },
            { comentario: "buen test", idUsuario: usuarios[2].idUsuario, idFotografia: fotos[0].idFotografia },
            { comentario: "me gusto", idUsuario: usuarios[0].idUsuario, idFotografia: fotos[3].idFotografia },
            { comentario: "ok", idUsuario: usuarios[3].idUsuario, idFotografia: fotos[5].idFotografia }
        ]);

        
        await Valoracion.bulkCreate([
            { valoracionFotografia: 5, idUsuario: usuarios[0].idUsuario, idFotografia: fotos[0].idFotografia },
            { valoracionFotografia: 5, idUsuario: usuarios[2].idUsuario, idFotografia: fotos[0].idFotografia },
            { valoracionFotografia: 2, idUsuario: usuarios[3].idUsuario, idFotografia: fotos[0].idFotografia },
            { valoracionFotografia: 4, idUsuario: usuarios[4].idUsuario, idFotografia: fotos[0].idFotografia },
            { valoracionFotografia: 1, idUsuario: usuarios[5].idUsuario, idFotografia: fotos[0].idFotografia },
            { valoracionFotografia: 2, idUsuario: usuarios[6].idUsuario, idFotografia: fotos[0].idFotografia },
            { valoracionFotografia: 4, idUsuario: usuarios[0].idUsuario, idFotografia: fotos[3].idFotografia }
        ]);

        
        await Seguidor.bulkCreate([
            { idUsuarioSeguido: usuarios[0].idUsuario, idSeguidor: usuarios[2].idUsuario },
            { idUsuarioSeguido: usuarios[2].idUsuario, idSeguidor: usuarios[0].idUsuario },
            { idUsuarioSeguido: usuarios[4].idUsuario, idSeguidor: usuarios[0].idUsuario },
            { idUsuarioSeguido: usuarios[3].idUsuario, idSeguidor: usuarios[4].idUsuario }
        ]);

        const motivos = await Motivo.bulkCreate([
            { nombreMotivo: "spam" },
            { nombreMotivo: "incitacion al odio" },
            { nombreMotivo: "Violencia" },
            { nombreMotivo: "Violacion copyright" },
            { nombreMotivo: "Fake news" }
        ])

        console.log("[+] seed cargado correctamente");

    } catch(err) {
        console.error("[-] error al cargar el seed de la base de datos de prueba: " + err);
    }
}

seed();