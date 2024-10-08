import { NextFunction, Request, Response } from 'express';
import { customError, notFoundError, requireError } from '../../../helpers/errors';
import { TransactionService, WalletService } from '../../services';

const { sequelize } = require('../../../db/models');

export class TransactionController {
    static async create(req: Request, res: Response, next: NextFunction) {
        const transaction = await sequelize.transaction();
        try {
            const { userId } = (req as any).user;
            const { walletId, amount, description, transactionDate, type, subCategoryId } =
                req.body;

            const isExpense = type === 'EXPENSE';

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
                { walletId, amount, description, transactionDate, type, subCategoryId, userId },
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
}
