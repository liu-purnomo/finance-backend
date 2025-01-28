'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Budgets', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            description: {
                type: Sequelize.TEXT
            },
            amount: {
                type: Sequelize.DECIMAL(15, 2)
            },
            periodStart: {
                allowNull: false,
                type: Sequelize.DATE
            },
            periodEnd: {
                allowNull: false,
                type: Sequelize.DATE
            },
            categoryId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'Categories',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            userId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Budgets');
    }
};
