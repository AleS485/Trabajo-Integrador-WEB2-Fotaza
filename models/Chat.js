import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Chat extends Model {}

Chat.init(
    {
        idChat: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        idInteres:{
            type: DataTypes.INTEGER,
            references:{
                model: 'Interes',
                key: 'idInteres',
            }
        },
        idAutorFoto:{
            type: DataTypes.INTEGER,
            references:{
                model: 'Usuario',
                key: 'idUsuario',
            }
        },
        idInteresado:{
            type: DataTypes.INTEGER,
            references:{
                model: 'Usuario',
                key: 'idUsuario',
            }
        },
        fechaCreacionChat:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    },
    {
        sequelize, 
        modelName: 'Chat', 
        tableName: 'chat', 
        createdAt: true, 
        deletedAt: true, 
    },
);















