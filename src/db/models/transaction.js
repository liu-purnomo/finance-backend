'use strict';
const { Model } = require('sequelize');
const { validation } = require('../helpers');
module.exports = (sequelize, DataTypes) => {
    class Transaction extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            Transaction.belongsTo(models.Wallet, {
                foreignKey: 'walletId',
                onDelete: 'CASCADE'
            });

            Transaction.belongsTo(models.User, {
                foreignKey: 'userId',
                onDelete: 'CASCADE'
            });

            Transaction.belongsTo(models.SubCategory, {
                foreignKey: 'subCategoryId',
                onDelete: 'CASCADE'
            });
        }
    }
    Transaction.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            amount: {
                type: DataTypes.DECIMAL(15, 2),
                ...validation({
                    field: 'Amount'
                })
            },
            description: DataTypes.STRING,
            transactionDate: DataTypes.DATE,
            type: {
                type: DataTypes.ENUM,
                values: ['INCOME', 'EXPENSE'],
                ...validation({
                    field: 'Type'
                })
            },
            subCategoryId: {
                type: DataTypes.UUID,
                ...validation({
                    field: 'SubCategory'
                })
            },
            walletId: DataTypes.UUID,
            userId: DataTypes.UUID
        },
        {
            sequelize,
            modelName: 'Transaction'
        }
    );
    return Transaction;
};
