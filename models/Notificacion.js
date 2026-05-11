import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Notificacion extends Model {}

Notificacion.init(
    {
        idNotificacion: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        idUsuarioRecibe:{
            type: DataTypes.INTEGER,
        },
        idUsuarioEnvia:{
            type: DataTypes.INTEGER,
        },
        idEvento:{
            type: DataTypes.INTEGER,
        },
        contenidoNotificacion:{
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        fechaNotificacion:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        fechaLectura:{
            type: DataTypes.DATE,
            allowNull: true,
        },
        estadoLectura:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    },
    {
        sequelize, 
        modelName: 'Notificacion', 
        tableName: 'notificacion', 
        createdAt: true, 
        deletedAt: true, 
    },
);















