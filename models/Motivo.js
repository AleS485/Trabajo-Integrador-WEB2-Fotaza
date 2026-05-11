import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Motivo extends Model {}

Motivo.init(
    {
        idMotivo: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombreMotivo:{
            type: DataTypes.STRING(80),
            allowNull: false,
            unique: true,
        }
    },
    {
        sequelize, 
        modelName: 'Motivo', 
        tableName: 'motivo', 
        createdAt: true, 
        deletedAt: true, 
    },
);















