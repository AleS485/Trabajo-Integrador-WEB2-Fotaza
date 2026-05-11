import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Comentario extends Model {}

Comentario.init(
    {
        idComentario: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        idFotografia:{
            type: DataTypes.INTEGER,
            references:{
                model: 'Fotografia',
                key: 'idFotografia',
            }
        },
        idUsuario:{
            type: DataTypes.INTEGER,
            references:{
                model: 'Usuario',
                key: 'idUsuario',
            }
        },
        comentario:{
            type: DataTypes.STRING(250),
            allowNull: false,
        },
        fechaComentario:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    },
    {
        sequelize, 
        modelName: 'Comentario', 
        tableName: 'comentario', 
        createdAt: true, 
        deletedAt: true, 
    },
);















