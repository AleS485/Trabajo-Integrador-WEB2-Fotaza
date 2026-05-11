import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Interes extends Model {}

Interes.init(
    {
        idInteres: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        idFotografia:{
            type: DataTypes.INTEGER,
            references:{
                model: 'Fotografia',
                key: 'idFotografia',
            }
        },
        idInteresado:{
            type: DataTypes.INTEGER,
            references:{
                model: 'Usuario',
                key: 'idUsuario',
            }
        },
        fechaInteres:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    },
    {
        sequelize, 
        modelName: 'Interes', 
        tableName: 'interes', 
        createdAt: true, 
        deletedAt: true, 
    },
);















