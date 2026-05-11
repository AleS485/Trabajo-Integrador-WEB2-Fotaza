import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Favorito extends Model {}

Favorito.init(
    {
        idFavorito: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        idUsuario:{
            type: DataTypes.INTEGER,
        },
        idPublicacion:{
            type: DataTypes.INTEGER,
        },
        fechaFavorito:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    },
    {
        sequelize, 
        modelName: 'Favorito', 
        tableName: 'favorito', 
        createdAt: true, 
        deletedAt: true, 
    },
);















