import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Evento extends Model {}

Evento.init(
    {
        idEvento: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombreEvento:{
            type: DataTypes.STRING(120),
            allowNull: false,
            unique: true,
        }
    },
    {
        sequelize, 
        modelName: 'Evento', 
        tableName: 'evento', 
        createdAt: true, 
        deletedAt: true, 
    },
);















