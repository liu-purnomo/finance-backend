'use strict';
const { Model } = require('sequelize');
const { validation } = require('../helpers');
module.exports = (sequelize, DataTypes) => {
    class SubCategory extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            SubCategory.belongsTo(models.Category, {
                foreignKey: 'categoryId',
                onDelete: 'CASCADE'
            });

            SubCategory.hasMany(models.Transaction, {
                foreignKey: 'subCategoryId',
                onDelete: 'CASCADE'
            });
        }
    }
    SubCategory.init(
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
            categoryId: {
                type: DataTypes.UUID,
                ...validation({
                    field: 'Category'
                })
            }
        },
        {
            sequelize,
            modelName: 'SubCategory'
        }
    );
    return SubCategory;
};
