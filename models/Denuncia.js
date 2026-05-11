import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Denuncia extends Model {}

Denuncia.init(
    {
        idDenuncia: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        idComentario:{
            type: DataTypes.INTEGER,
            allowNull: true,
            references:{
                model: 'Comentario',
                key: 'idComentario',
            }
        },
        idFotografia:{
            type: DataTypes.INTEGER,
            allowNull: true,
            references:{
                model: 'Fotografia',
                key: 'idFotografia',
            }
        },
        idUsuario:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: 'Usuario',
                key: 'idUsuario',
            }
        },
        idMotivo:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: 'Motivo',
                key: 'idMotivo',
            }
        },
        justificacionUsuario:{
            type: DataTypes.STRING(250),
            allowNull: true,
        },
        estadoDenuncia:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        fechaDenuncia:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        fechaResolucion:{
            type: DataTypes.DATE,
            allowNull: true,
        },
        observacionValidador:{
            type: DataTypes.STRING(350),
            allowNull: true,
        }
    },
    {
        sequelize, 
        modelName: 'Denuncia', 
        tableName: 'denuncia', 
        createdAt: true, 
        deletedAt: true, 
    },
);















