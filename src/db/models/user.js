'use strict';
const { Model } = require('sequelize');
const { validation } = require('../helpers');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            name: {
                type: DataTypes.STRING,
                ...validation({
                    field: 'Name'
                })
            },
            email: {
                type: DataTypes.STRING,
                ...validation({
                    field: 'Email',
                    isUnique: true
                })
            },
            password: {
                type: DataTypes.STRING,
                ...validation({
                    field: 'Password'
                })
            },
            token: DataTypes.STRING,
            isVerified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        },
        {
            sequelize,
            modelName: 'User'
        }
    );
    return User;
};
