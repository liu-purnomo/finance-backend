'use strict';
const { Model } = require('sequelize');
const { validation } = require('../helpers');
module.exports = (sequelize, DataTypes) => {
    class Wallet extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            Wallet.belongsTo(models.User, {
                foreignKey: 'userId',
                onDelete: 'CASCADE'
            });
        }
    }
    Wallet.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            type: {
                type: DataTypes.STRING,
                ...validation({
                    field: 'Type'
                })
            },
            name: {
                type: DataTypes.STRING,
                ...validation({
                    field: 'Name'
                })
            },
            balance: {
                type: DataTypes.DECIMAL(15, 2),
                defaultValue: 0,
                ...validation({
                    field: 'Balance'
                })
            },
            currency: {
                type: DataTypes.STRING,
                defaultValue: 'IDR'
            },
            description: DataTypes.TEXT,
            userId: DataTypes.UUID
        },
        {
            sequelize,
            modelName: 'Wallet'
        }
    );
    return Wallet;
};
