import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Etiqueta extends Model {}

Etiqueta.init(
    {
        idEtiqueta: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombreEtiqueta:{
            type: DataTypes.STRING(50),
            allowNull: false,
        }
    },
    {
        sequelize, 
        modelName: 'Etiqueta', 
        tableName: 'etiqueta', 
        createdAt: true, 
        deletedAt: true, 
    },
);















