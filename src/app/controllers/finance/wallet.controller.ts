import { NextFunction, Request, Response } from 'express';
import { errorList } from '../../../helpers/errors';
import { indexResponse } from '../../../helpers/utils';
import { WalletService } from '../../services';
const { sequelize } = require('../../../db/models');

export class WalletController {
    static async create(req: Request, res: Response, next: NextFunction) {
        const transaction = await sequelize.transaction();
        try {
            const { type, name, balance, currency, description } = req.body;

            const { userId } = (req as any).user;

            const data = await WalletService.create(
                { type, name, balance, currency, description, userId },
                transaction
            );

            const response = {
                // data,
                status: 'success',
                message: 'Data created successfully'
            };

            await transaction.commit();
            res.status(200).json(response);

            // (req as any).payload = {
            //     response,
            //     data: [{ data, modelName: 'Wallet' }]
            // };

            // next();
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        const transaction = await sequelize.transaction();
        try {
            const { userId } = (req as any).user;
            const { id } = req.params;
            const { type, name, balance, currency, description } = req.body;

            const isExists = await WalletService.detail(id, userId);

            if (!isExists) throw errorList.notFound;

            const data = await WalletService.update(
                id,
                userId,
                { type, name, balance, currency, description },
                transaction
            );

            const response = {
                // data,
                status: 'success',
                message: 'Data updated successfully'
            };

            await transaction.commit();
            res.status(200).json(response);

            // (req as any).payload = {
            //     response,
            //     data: [{ data, modelName: 'Wallet' }]
            // };

            // next();
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }

    static async detail(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { userId } = (req as any).user;

            const data = await WalletService.detail(id, userId);
            if (!data) throw errorList.notFound;

            res.status(200).json({
                data,
                status: 'success',
                message: 'Retrieved data successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    static async index(req: Request, res: Response, next: NextFunction) {
        try {
            const { page, size, search, sort, order, type, name, currency } = req.query;
            const { userId } = (req as any).user;

            const limit = size ? Number(size) : 10;
            const offset = page ? (Number(page) - 1) * limit : 0;

            const data = await WalletService.index({
                limit,
                offset,
                search,
                type,
                name,
                currency,
                userId,
                order: order ? order : 'DESC',
                sort: sort ? sort : 'createdAt'
            } as any);

            const response = indexResponse(data, page, limit);

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

            const data = await WalletService.delete(id, userId, transaction);

            if (data === 0) {
                throw errorList.notFound;
            }

            const response = { status: 'success', message: 'Deleted data successfully' };

            await transaction.commit();
            res.status(200).json(response);

            // (req as any).payload = {
            //     response,
            //     data: [{ data, modelName: 'Wallet' }]
            // };

            // next();
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = (req as any).user;
            const data = await WalletService.getAll(userId);
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }
}
