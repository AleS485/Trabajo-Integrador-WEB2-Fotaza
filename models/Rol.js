import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Rol extends Model {}

Rol.init(
    {
        idRol: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombreRol:{
            type: DataTypes.STRING(120),
            allowNull: false,
            unique: true,
        }
    },
    {
        sequelize, 
        modelName: 'Rol', 
        tableName: 'rol', 
        createdAt: true, 
        deletedAt: true, 
    },
);















