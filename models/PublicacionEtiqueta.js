import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class PublicacionEtiqueta extends Model {}

PublicacionEtiqueta.init(
    {
        idPublicacionEtiqueta: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        idPublicacion: {
            type: DataTypes.INTEGER,
        },
        idEtiqueta:{
            type: DataTypes.INTEGER,
        },
    },
    {
        sequelize, 
        modelName: 'PublicacionEtiqueta', 
        tableName: 'publicacionEtiqueta', 
        createdAt: true, 
        deletedAt: true, 
    },
);















