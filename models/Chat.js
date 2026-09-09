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
        },
        idAutorFoto:{
            type: DataTypes.INTEGER,
        },
        idInteresado:{
            type: DataTypes.INTEGER,
        }
    },
    {
        sequelize, 
        modelName: 'Chat', 
        tableName: 'chat', 
        createdAt: 'fechaCreacionChat',
        updatedAt: false, 
        deletedAt: true, 
    },
);















