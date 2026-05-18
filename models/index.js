import { Usuario } from "./Usuario.js";
import { Publicacion } from "./Publicacion.js";
import { Etiqueta } from "./Etiqueta.js";
import { PublicacionEtiqueta } from "./PublicacionEtiqueta.js";
import { Favorito } from "./Favorito.js";
import { Coleccion } from "./Coleccion.js";
import { ColeccionPublicacion } from "./ColeccionPublicacion.js";
import { Comentario } from "./Comentario.js";
import { Fotografia } from "./Fotografia.js";
import { MarcaDeAgua } from "./MarcaDeAgua.js";
import { Motivo } from "./Motivo.js";
import { Denuncia } from "./Denuncia.js";
import { Valoracion } from "./Valoracion.js";
import { Interes } from "./Interes.js";
import { Chat } from "./Chat.js";
import { Mensaje } from "./Mensaje.js";
import { Seguidor } from "./Seguidor.js";
import { Notificacion } from "./Notificacion.js";
import { Evento } from "./Evento.js";
import sequelize from "./config.js";

// relaciones entre modelos y defino las foreign key


// usuario publicacion
Usuario.hasMany(Publicacion, { foreignKey: 'idUsuario'});
Publicacion.belongsTo(Usuario, { foreignKey: 'idUsuario' });

// publicacion etiqueta y tabla intermedia
Publicacion.belongsToMany(Etiqueta, {through: PublicacionEtiqueta, foreignKey: 'idPublicacion'});
Etiqueta.belongsToMany(Publicacion, {through: PublicacionEtiqueta, foreignKey: 'idEtiqueta'});

// favorito (por si solo con usuario y publicacion)

Usuario.belongsToMany(Publicacion, { through: Favorito, foreignKey: 'idUsuario'});
Publicacion.belongsToMany(Usuario, { through: Favorito, foreignKey: 'idPublicacion'});

// coleccion publicacion con publicacion

Coleccion.belongsToMany(Publicacion, { through: ColeccionPublicacion, foreignKey: 'idColeccion'});
Publicacion.belongsToMany(Coleccion, { through: ColeccionPublicacion, foreignKey: 'idPublicacion'});


// publicacion con fotografia

Publicacion.hasMany(Fotografia, { foreignKey: 'idPublicacion'});
Fotografia.belongsTo(Publicacion, { foreignKey: 'idPublicacion'})

// fotografia con comentario

Fotografia.hasMany(Comentario, { foreignKey: 'idFotografia'});
Comentario.belongsTo(Fotografia, { foreignKey: 'idFotografia'});

// usuarios con comentarios

Usuario.hasMany(Comentario, { foreignKey: 'idUsuario'});
Comentario.belongsTo(Usuario, { foreignKey: 'idUsuario'});

// fotografia con marca de agua (copyright, cada una tiene una sola marca)

Fotografia.hasOne(MarcaDeAgua, { foreignKey: 'idFotografia'});
MarcaDeAgua.belongsTo(Fotografia, { foreignKey: 'idFotografia' });

// motivo con denuncia (base)

Motivo.hasMany(Denuncia, { foreignKey: 'idMotivo' });
Denuncia.belongsTo(Motivo, { foreignKey: 'idMotivo'});

// las otras relaciones de denuncia

Usuario.hasMany(Denuncia, { foreignKey: 'idUsuario'});
Denuncia.belongsTo(Usuario, { foreignKey: 'idUsuario'});

Comentario.hasMany(Denuncia, { foreignKey: 'idComentario'});
Denuncia.belongsTo(Comentario, { foreignKey: 'idComentario'});

Fotografia.hasMany(Denuncia, { foreignKey: 'idFotografia'});
Denuncia.belongsTo(Fotografia, { foreignKey: 'idFotografia'});

// valoracion

Usuario.hasMany(Valoracion, { foreignKey: 'idUsuario'});
Valoracion.belongsTo(Usuario, { foreignKey: 'idUsuario'});

Fotografia.hasMany(Valoracion, { foreignKey: 'idFotografia'});
Valoracion.belongsTo(Fotografia, { foreignKey: 'idFotografia'});

// interes de fotografia y usuario

Fotografia.hasMany(Interes, { foreignKey: 'idFotografia'});
Interes.belongsTo(Fotografia, { foreignKey: 'idFotografia'});

Usuario.hasMany(Interes, { foreignKey: 'idInteresado'});
Interes.belongsTo(Usuario, { foreignKey: 'idInteresado'});

// chat

Interes.hasOne(Chat, { foreignKey: 'idInteres'});
Chat.belongsTo(Interes, { foreignKey: 'idInteres'});

// mensajes

Chat.hasMany(Mensaje, { foreignKey: 'idChat'});
Mensaje.belongsTo(Chat, { foreignKey: 'idChat'});

// chat y los usuarios

Usuario.hasMany(Chat, { foreignKey: 'idAutorFoto'});
Chat.belongsTo(Usuario, { foreignKey: 'idAutorFoto', as: 'vendedor'}); // as para distinguir con el alias, revisar por las dudas

Usuario.hasMany(Chat, { foreignKey: 'idInteresado'});
Chat.belongsTo(Usuario, { foreignKey: 'idInteresado', as: 'interesado'});

// mensaje y usuario que lo envia

Mensaje.belongsTo(Usuario, { foreignKey: 'idUsuarioEmisor', as: 'emisor'}); // posible alias para distinguir

// seguidores y usuarios

Usuario.belongsToMany(Usuario, { through: Seguidor, as: 'seguidor', foreignKey: 'idSeguidor'});
Usuario.belongsToMany(Usuario, { through: Seguidor, as: 'seguido', foreignKey: 'idUsuarioSeguido'});

// notificaciones

Notificacion.belongsTo(Usuario, { foreignKey: 'idUsuarioEnvia', as: 'usuarioEnvia'});
Notificacion.belongsTo(Usuario, { foreignKey: 'idUsuarioRecibe', as: 'usuarioRecibe'});

// notificacion con evento

Evento.hasMany(Notificacion, { foreignKey: 'idEvento'});
Notificacion.belongsTo(Evento, { foreignKey: 'idEvento'});


// funcion que exporto para hacer el sync

export async function funcionSync(){
    
    try{
        await sequelize.authenticate() // testear la conexion
        console.log('[+] Conexion a bd establecida')

        await sequelize.sync({ alter: true})
        console.log('[+] Sincronizado de modelos')
    } catch(err){
        console.error('[+] Error en la conexion a la bd ' + err);
        throw err;
    }

}

// force no recomienda tenerlo activado





