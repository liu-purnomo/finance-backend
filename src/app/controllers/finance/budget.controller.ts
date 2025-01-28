import { NextFunction, Request, Response } from 'express';
import { errorList, notFoundError } from '../../../helpers/errors';
import { indexResponse } from '../../../helpers/utils';
import { BudgetService } from '../../services';
const { sequelize } = require('../../../db/models');

export class BudgetController {
    static async create(req: Request, res: Response, next: NextFunction) {
        const transaction = await sequelize.transaction();
        try {
            const { description, amount, periodStart, periodEnd, categoryId } = req.body;

            const { userId } = (req as any).user;

            const data = await BudgetService.create(
                { description, amount, periodStart, periodEnd, categoryId, userId },
                transaction
            );

            const response = {
                data,
                status: 'success',
                message: 'Data created successfully'
            };

            await transaction.commit();
            res.status(201).json(response);

            (req as any).payload = {
                response,
                data: [{ data, modelName: 'Budget' }]
            };

            next();
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        const transaction = await sequelize.transaction();
        try {
            const { id } = req.params;
            const { userId } = (req as any).user;
            const { description, amount, periodStart, periodEnd, categoryId } = req.body;

            const isExists = await BudgetService.detail(id, userId);

            if (!isExists) throw errorList.notFound;

            const data = await BudgetService.update(
                id,
                userId,
                { description, amount, periodStart, periodEnd, categoryId },
                transaction
            );

            const response = {
                data,
                status: 'success',
                message: 'Data updated successfully'
            };

            await transaction.commit();
            res.status(200).json(response);

            (req as any).payload = {
                response,
                data: [{ data, modelName: 'Budget' }]
            };

            next();
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }

    static async detail(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { userId } = (req as any).user;

            const data = await BudgetService.detail(id, userId);
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
            const {
                page,
                size,
                search,
                sort,
                order,
                description,
                amount,
                periodStart,
                periodEnd,
                category,
                userId
            } = req.query;

            const limit = size ? Number(size) : 10;
            const offset = page ? (Number(page) - 1) * limit : 0;

            const data = await BudgetService.index({
                limit,
                offset,
                search,
                description,
                amount,
                periodStart,
                periodEnd,
                category,
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

            const data = await BudgetService.delete(id, userId, transaction);

            if (data === 0) {
                throw notFoundError('Budget');
            }

            const response = { status: 'success', message: 'Deleted data successfully' };

            res.status(200).json(response);

            await transaction.commit();
            (req as any).payload = {
                response,
                data: [{ data, modelName: 'Budget' }]
            };

            next();
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = (req as any).user;
            const data = await BudgetService.getAll(userId);
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }
}
