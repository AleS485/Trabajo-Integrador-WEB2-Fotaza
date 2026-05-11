import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class ColeccionPublicacion extends Model {}

ColeccionPublicacion.init(
    {
        idColeccionPublicacion: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        idColeccion:{
            type: DataTypes.INTEGER,
            references:{
                model: 'Coleccion',
                key: 'idColeccion',
            }
        },
        idPublicacion:{
            type: DataTypes.INTEGER,
            references:{
                model: 'Publicacion',
                key: 'idPublicacion',
            }
        }
    },
    {
        sequelize, 
        modelName: 'ColeccionPublicacion', 
        tableName: 'coleccionPublicacion', 
        createdAt: true, 
        deletedAt: true, 
    },
);















