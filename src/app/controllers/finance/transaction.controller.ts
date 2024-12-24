import { NextFunction, Request, Response } from 'express';
import { customError, notFoundError, requireError } from '../../../helpers/errors';
import { DateHelper } from '../../../helpers/utils';
import { CategoryService, TransactionService, UserService, WalletService } from '../../services';

const { sequelize } = require('../../../db/models');

export class TransactionController {
    static async create(req: Request, res: Response, next: NextFunction) {
        const transaction = await sequelize.transaction();
        try {
            const { userId } = (req as any).user;
            const { walletId, amount, description, transactionDate, categoryId } = req.body;

            const category = await CategoryService.detail(categoryId, userId);

            if (!category) throw notFoundError('Category');

            const isExpense = category?.type === 'EXPENSE';

            if (!amount || amount <= 0) throw requireError('Amount');
            if (!walletId) throw requireError('Wallet');

            const Wallet = await WalletService.detail(walletId, userId);

            if (!Wallet) throw notFoundError('Wallet');

            let balance = Number(Wallet.balance);

            if (isExpense) {
                if (amount > balance) throw customError(400, 'Insufficient balance');
                balance = balance - Number(amount);
            } else {
                balance = balance + Number(amount);
            }

            await WalletService.update(walletId, userId, { balance }, transaction);

            await TransactionService.create(
                { walletId, amount, description, transactionDate, categoryId, userId },
                transaction
            );

            const response = {
                status: 'success',
                message: 'Data created successfully'
            };

            await transaction.commit();
            res.status(200).json(response);
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }

    static async getSummary(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = (req as any).user;
            const { walletId } = req.params;
            const { period = 'weekly' } = req.query;

            const Wallet = await WalletService.detail(walletId, userId);
            if (!Wallet) throw notFoundError('Wallet');

            const UserConfig = await UserService.findById(userId);

            const currentDate = new Date();
            let startDate: Date;
            let endDate: Date;

            // Parsing UserConfig for custom settings
            const { firstDayOfWeek, firstDayOfTheMonth, firstMonthOfTheYear } = UserConfig;

            // Determine startDate and endDate based on period (weekly, monthly, yearly)
            switch (period) {
                case 'weekly':
                    // Start from firstDayOfWeek
                    const firstDay = DateHelper.getFirstDayOfWeek(currentDate, firstDayOfWeek);
                    startDate = new Date(firstDay);
                    endDate = new Date(firstDay);
                    endDate.setDate(startDate.getDate() + 6); // End of the week
                    break;

                case 'monthly':
                    // Start from firstDayOfTheMonth
                    startDate = new Date(
                        currentDate.getFullYear(),
                        currentDate.getMonth(),
                        firstDayOfTheMonth
                    );
                    endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0); // End of the month
                    break;

                case 'yearly':
                    // Start from firstMonthOfTheYear and firstDayOfTheMonth
                    const firstMonth = DateHelper.getMonthFromName(firstMonthOfTheYear);
                    startDate = new Date(currentDate.getFullYear(), firstMonth, firstDayOfTheMonth);
                    endDate = new Date(startDate.getFullYear() + 1, firstMonth, 0); // End of the year
                    break;

                default:
                    throw new Error('Invalid period');
            }

            const Transactions = await TransactionService.summary(walletId, startDate, endDate);

            const Summary = Transactions.reduce((acc: any, transaction: any) => {
                const categoryName = transaction.Category.name;

                if (!acc[categoryName]) {
                    acc[categoryName] = {
                        name: categoryName,
                        type: transaction.type,
                        icon: transaction.Category.icon,
                        amount: 0
                    };
                }

                acc[categoryName].amount += parseFloat(transaction.amount);

                return acc;
            }, {});

            const response = {
                status: 'success',
                message: 'Data retrieved successfully',
                data: {
                    Wallet,
                    Transactions,
                    Summary: Object.values(Summary)
                }
            };

            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        const transaction = await sequelize.transaction();
        try {
            const { id } = req.params;
            const { userId } = (req as any).user;
            const Transaction = await TransactionService.detail(id, userId);
            if (!Transaction) throw notFoundError('Transaction');

            const Wallet = await WalletService.detail(Transaction.walletId, userId);
            if (!Wallet) throw notFoundError('Wallet');

            const Category = await CategoryService.detail(Transaction?.categoryId, userId);

            if (!Category) throw notFoundError('Category');

            let balance = 0;

            if (Category?.type === 'EXPENSE') {
                balance = Number(Wallet.balance) + Number(Transaction.amount);
            } else {
                balance = Number(Wallet.balance) - Number(Transaction.amount);
            }

            await WalletService.update(Transaction.walletId, userId, { balance }, transaction);
            await TransactionService.delete(id, userId, transaction);

            const response = {
                status: 'success',
                message: 'Data deleted successfully'
            };

            await transaction.commit();
            res.status(200).json(response);
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        const transaction = await sequelize.transaction();
        try {
            const { id } = req.params;
            const { amount, description, transactionDate } = req.body;
            const { userId } = (req as any).user;
            const Transaction = await TransactionService.detail(id, userId);
            if (!Transaction) throw notFoundError('Transaction');

            const Wallet = await WalletService.detail(Transaction.walletId, userId);
            if (!Wallet) throw notFoundError('Wallet');

            let balance = Number(Wallet.balance);

            const Category = await CategoryService.detail(Transaction?.categoryId, userId);

            if (!Category) throw notFoundError('Category');

            if (Transaction.amount !== amount) {
                if (Category.type === 'EXPENSE') {
                    balance = Number(Wallet.balance) + Number(Transaction.amount) - Number(amount);
                } else {
                    balance = Number(Wallet.balance) + Number(amount) - Number(Transaction.amount);
                    if (balance < 0) throw customError(400, 'Insufficient balance');
                }
            }

            await WalletService.update(Transaction.walletId, userId, { balance }, transaction);
            await TransactionService.update(
                id,
                userId,
                { amount, description, transactionDate },
                transaction
            );

            const response = {
                status: 'success',
                message: 'Data updated successfully'
            };

            await transaction.commit();
            res.status(200).json(response);
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }
}
