import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Valoracion extends Model {}

Valoracion.init(
    {
        idValoracion: {
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
        idFotografia:{
            type: DataTypes.INTEGER,
            references:{
                model: 'Fotografia',
                key: 'idFotografia',
            }
        },
        valoracionPublicacion:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                min: 1,
                max: 5,
            }
        },
        fechaValoracion:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    },
    {
        sequelize, 
        modelName: 'Valoracion', 
        tableName: 'valoracion', 
        createdAt: true, 
        deletedAt: true, 
    },
);















