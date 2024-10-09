'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Transactions', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            amount: {
                type: Sequelize.DECIMAL(15, 2)
            },
            description: {
                type: Sequelize.STRING
            },
            transactionDate: {
                type: Sequelize.DATE
            },
            type: {
                type: Sequelize.ENUM,
                values: ['INCOME', 'EXPENSE']
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
            walletId: {
                type: Sequelize.UUID,
                references: {
                    model: 'Wallets',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            userId: {
                type: Sequelize.UUID,
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
        await queryInterface.dropTable('Transactions');
    }
};
