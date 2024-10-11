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
            User.hasMany(models.Wallet, {
                foreignKey: 'userId',
                onDelete: 'CASCADE'
            });

            User.hasMany(models.Transaction, {
                foreignKey: 'userId',
                onDelete: 'CASCADE'
            });

            User.hasMany(models.Category, {
                foreignKey: 'userId',
                onDelete: 'CASCADE'
            });
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
            },
            firstDayOfWeek: {
                type: DataTypes.STRING,
                defaultValue: 'Monday'
            },
            firstDayOfTheMonth: {
                type: DataTypes.INTEGER,
                defaultValue: 1
            },
            firstMonthOfTheYear: {
                type: DataTypes.STRING,
                defaultValue: 'January'
            }
        },
        {
            sequelize,
            modelName: 'User'
        }
    );
    return User;
};
