import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";
import bcrypt from 'bcrypt';


export class Usuario extends Model {

    validatePassword(password){
        return bcrypt.compare(password, this.passwordUsuario);
    }

}

Usuario.init(
    {
        idUsuario: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombreUsuario:{
            type: DataTypes.STRING(50),
            allowNull: false
        },
        apellidoUsuario:{
            type: DataTypes.STRING(50),
            allowNull: false
        },
        passwordUsuario:{
            type: DataTypes.STRING(250),
            allowNull: false
        },
        email:{
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true,
        },
        avatarUsuario:{
            type: DataTypes.BLOB('long'),
            allowNull: false
        },
        isValidador:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        estadoUsuario:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        fechaDesactivacion:{
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        sequelize, // necesario para conectarse a la bd
        modelName: 'Usuario', // nombre del modelo
        tableName: 'usuario', // nombre de la tabla
        createdAt: true, // cada vez que crea un usuario coloca la fecha de creacion
        deletedAt: true, // cada vez que se elimina un usuario coloca la fecha de eliminacion
        hooks: {
            beforeSave: async (Usuario) => {
                if(!Usuario.passwordUsuario) return;
                if(!Usuario.changed('passwordUsuario')) return;
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(Usuario.passwordUsuario, salt)
                Usuario.passwordUsuario = hashedPassword;
            }
        }
    },
);
















