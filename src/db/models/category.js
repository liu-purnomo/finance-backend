'use strict';

import { Model } from 'sequelize';
const { validation } = require('../helpers');
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            Category.belongsTo(models.User, {
                foreignKey: 'userId',
                onDelete: 'CASCADE'
            });

            Category.hasMany(models.Transaction, {
                foreignKey: 'categoryId',
                onDelete: 'CASCADE'
            });

            Category.hasMany(models.Budget, {
                foreignKey: 'categoryId',
                onDelete: 'CASCADE'
            });
        }
    }
    Category.init(
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
            icon: {
                type: DataTypes.STRING,
                defaultValue: 'wallet'
            },
            type: {
                type: DataTypes.ENUM,
                values: ['INCOME', 'EXPENSE', 'DEBT'],
                ...validation({
                    field: 'Type'
                })
            },
            userId: DataTypes.UUID
        },
        {
            sequelize,
            modelName: 'Category'
        }
    );
    return Category;
};
