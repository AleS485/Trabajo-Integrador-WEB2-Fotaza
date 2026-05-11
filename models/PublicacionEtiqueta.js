import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class PublicacionEtiqueta extends Model {}

PublicacionEtiqueta.init(
    {
        idPublicacion: {
            type: DataTypes.INTEGER,
            references:{
                model: 'Publicacion',
                key: 'idPublicacion',
            }
        },
        idEtiqueta:{
            type: DataTypes.INTEGER,
            references:{
                model: 'Etiqueta',
                key: 'idEtiqueta',
            }
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















