import { NextFunction, Request, Response } from 'express';
import { customError, notFoundError } from '../../../helpers/errors';
import { comparePassword, hashPassword } from '../../../libraries';
import { UserService } from '../../services';

const { sequelize } = require('../../../db/models');

export class UserController {
    static async myProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = (req as any).user;
            const data = await UserService.findById(userId);

            res.status(200).json({
                data,
                status: 'success',
                message: 'Retrieved data successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        const transaction = await sequelize.transaction();
        try {
            const { userId } = (req as any).user;
            const { name, firstDayOfWeek, firstDayOfTheMonth, firstMonthOfTheYear } = req.body;

            const data = await UserService.update(
                userId,
                { name, firstDayOfWeek, firstDayOfTheMonth, firstMonthOfTheYear },
                transaction
            );

            await transaction.commit();
            res.status(200).json({
                data,
                status: 'success',
                message: 'Data updated successfully'
            });
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        const transaction = await sequelize.transaction();
        try {
            const { userId } = (req as any).user;
            await UserService.delete(userId, transaction);

            await transaction.commit();
            res.status(200).json({
                status: 'success',
                message: 'Your account has been deleted successfully'
            });
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }

    static async changePassword(req: Request, res: Response, next: NextFunction) {
        const transaction = await sequelize.transaction();
        try {
            const { userId } = (req as any).user;
            const { oldPassword, newPassword } = req.body;

            const user = await UserService.findById(userId);

            if (!user) {
                throw notFoundError('User');
            }

            const isValidPassword = comparePassword(oldPassword, user?.password);

            if (!isValidPassword) {
                throw new Error('Old password is incorrect');
            }

            if (oldPassword === newPassword) {
                throw new Error('New password cannot be the same as the old one');
            }

            if (newPassword.length <= 5) {
                throw customError(400, 'Password must be at least 6 characters long');
            }

            const hashedPassword = hashPassword(newPassword);

            await UserService.update(
                user.id,
                {
                    token: null,
                    password: hashedPassword
                },
                transaction
            );

            await transaction.commit();
            res.status(200).json({
                status: 'success',
                message: 'Password updated successfully'
            });
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }
}
