import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Publicacion extends Model {}

Publicacion.init(
    {
        idPublicacion: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        idUsuario:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tituloPublicacion:{
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        descripcionPublicacion:{
            type: DataTypes.STRING(350),
            allowNull: true,
        },
        fechaPublicacion:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        fechaCierreComentarios:{
            type: DataTypes.DATE,
            allowNull: true,
        },
        isCerrado:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    },
    {
        sequelize, // necesario para conectarse a la bd
        modelName: 'Publicacion', 
        tableName: 'publicacion', 
        createdAt: true, 
        deletedAt: true, 
    },
);















