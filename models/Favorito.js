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
            references:{
                model: 'Usuario',
                key: 'idUsuario',
            }
        },
        idPublicacion:{
            type: DataTypes.INTEGER,
            references:{
                model: 'Publicacion',
                key: 'idPublicacion',
            }
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















