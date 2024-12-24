import { NextFunction, Request, Response } from 'express';
import { errorList } from '../../../helpers/errors';
import { indexResponse } from '../../../helpers/utils';
import { CategoryService } from '../../services';
const { sequelize } = require('../../../db/models');

export class CategoryController {
    static async create(req: Request, res: Response, next: NextFunction) {
        const transaction = await sequelize.transaction();
        try {
            const { name, icon, type } = req.body;

            const { userId } = (req as any).user;

            await CategoryService.create({ name, icon, type, userId }, transaction);

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

    static async update(req: Request, res: Response, next: NextFunction) {
        const transaction = await sequelize.transaction();
        try {
            const { userId } = (req as any).user;
            const { id } = req.params;
            const { name, icon, type } = req.body;

            const isExists = await CategoryService.detail(id, userId);

            if (!isExists) throw errorList.notFound;

            await CategoryService.update(id, userId, { name, type, icon }, transaction);

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

    static async detail(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { userId } = (req as any).user;

            const data = await CategoryService.detail(id, userId);
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
            const { page, size, search, type, sort, order, name } = req.query;
            const { userId } = (req as any).user;

            const limit = size ? Number(size) : 10;
            const offset = page ? (Number(page) - 1) * limit : 0;

            const data = await CategoryService.index({
                limit,
                offset,
                search,
                name,
                type,
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

            const data = await CategoryService.delete(id, userId, transaction);

            if (data === 0) {
                throw errorList.notFound;
            }

            const response = { status: 'success', message: 'Deleted data successfully' };

            await transaction.commit();
            res.status(200).json(response);
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = (req as any).user;
            const data = await CategoryService.getAll(userId);
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }
}
