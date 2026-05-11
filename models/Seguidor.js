import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Seguidor extends Model {}

Seguidor.init(
    {
        idSeguimiento: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        idUsuarioSeguido:{
            type: DataTypes.INTEGER,
            references:{
                model: 'Usuario',
                key: 'idUsuario',
            }
        },
        idSeguidor:{
            type: DataTypes.INTEGER,
            references:{
                model: 'Usuario',
                key: 'idUsuario',
            }
        },
        fechaSeguimiento:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    },
    {
        sequelize, 
        modelName: 'Seguidor', 
        tableName: 'seguidor', 
        createdAt: true, 
        deletedAt: true, 
    },
);















