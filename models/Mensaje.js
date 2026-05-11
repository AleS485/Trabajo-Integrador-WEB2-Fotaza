import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Mensaje extends Model {}

Mensaje.init(
    {
        idMensaje: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        idChat:{
            type: DataTypes.INTEGER,
            references:{
                model: 'Chat',
                key: 'idChat',
            }
        },
        idUsuarioEmisor:{
            type: DataTypes.INTEGER,
            references:{
                model: 'Usuario',
                key: 'idUsuario',
            }
        },
        contenido:{
            type: DataTypes.STRING(350),
            allowNull: false,
        },
        fechaEnvio:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    },
    {
        sequelize, 
        modelName: 'Mensaje', 
        tableName: 'mensaje', 
        createdAt: true, 
        deletedAt: true, 
    },
);















