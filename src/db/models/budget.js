'use strict';
import { Model } from 'sequelize';
const { validation } = require('../helpers');
module.exports = (sequelize, DataTypes) => {
    class Budget extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Budget.belongsTo(models.User, {
                foreignKey: 'userId',
                onDelete: 'CASCADE'
            });

            Budget.belongsTo(models.Category, {
                foreignKey: 'categoryId',
                onDelete: 'CASCADE'
            });
        }
    }
    Budget.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            description: DataTypes.TEXT,
            amount: {
                type: DataTypes.DECIMAL(15, 2),
                ...validation({
                    field: 'Amount'
                })
            },
            periodStart: {
                type: DataTypes.DATE,
                ...validation({
                    field: 'Period Start'
                })
            },
            periodEnd: {
                type: DataTypes.DATE,
                ...validation({
                    field: 'Period End'
                })
            },
            categoryId: {
                type: DataTypes.UUID,
                ...validation({
                    field: 'Category'
                })
            },
            userId: DataTypes.UUID
        },
        {
            sequelize,
            modelName: 'Budget'
        }
    );
    return Budget;
};
