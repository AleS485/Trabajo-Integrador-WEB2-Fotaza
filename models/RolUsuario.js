import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class RolUsuario extends Model {}

RolUsuario.init(
    {
        idUsuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        idRol:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        sequelize, 
        modelName: 'RolUsuario', 
        tableName: 'rolusuario', 
        createdAt: true, 
        deletedAt: true, 
    },
);















