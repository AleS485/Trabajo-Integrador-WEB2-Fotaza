import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Fotografia extends Model {}

Fotografia.init(
    {
        idFotografia: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        idPublicacion:{
            type: DataTypes.INTEGER,
        },
        urlArchivo:{
            type: DataTypes.STRING(250),
            allowNull: false,
        },
        isCopyright:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        }
    },
    {
        sequelize, 
        modelName: 'Fotografia', 
        tableName: 'fotografia', 
        createdAt: true, 
        deletedAt: true, 
    },
);















