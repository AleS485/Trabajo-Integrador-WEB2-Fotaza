import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Interes extends Model {}

Interes.init(
    {
        idInteres: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        idFotografia:{
            type: DataTypes.INTEGER,
        },
        idInteresado:{
            type: DataTypes.INTEGER,
        },
        fechaInteres:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    },
    {
        sequelize, 
        modelName: 'Interes', 
        tableName: 'interes', 
        createdAt: true, 
        deletedAt: true, 
    },
);















