import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class MarcaDeAgua extends Model {}

MarcaDeAgua.init(
    {
        idMarcaAgua: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        idFotografia:{
            type: DataTypes.INTEGER,
            unique: true,
            references:{
                model: 'Fotografia',
                key: 'idFotografia',
            }
        },
        contenidoMarca:{
            type: DataTypes.STRING(50),
            allowNull: false,
        }
    },
    {
        sequelize, 
        modelName: 'MarcaDeAgua', 
        tableName: 'marcaDeAgua', 
        createdAt: true, 
        deletedAt: true, 
    },
);















