import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Coleccion extends Model {}

Coleccion.init(
    {
        idColeccion: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombreColeccion:{
            type: DataTypes.STRING(50),
            allowNull: false,
        }
    },
    {
        sequelize, 
        modelName: 'Coleccion', 
        tableName: 'coleccion', 
        createdAt: true, 
        deletedAt: true, 
    },
);















