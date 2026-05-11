import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class PublicacionEtiqueta extends Model {}

PublicacionEtiqueta.init(
    {
        idPublicacion: {
            type: DataTypes.INTEGER,
        },
        idEtiqueta:{
            type: DataTypes.INTEGER,
        }
    },
    {
        sequelize, 
        modelName: 'PublicacionEtiqueta', 
        tableName: 'publicacionEtiqueta', 
        createdAt: true, 
        deletedAt: true, 
    },
);















