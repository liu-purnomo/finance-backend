import { NextFunction, Request, Response } from 'express';
import { errorList } from '../../../helpers/errors';
import { indexResponse } from '../../../helpers/utils';
import { SubCategoryService } from '../../services';
const { sequelize } = require('../../../db/models');

export class SubCategoryController {
    static async create(req: Request, res: Response, next: NextFunction) {
        const transaction = await sequelize.transaction();
        try {
            const { name, categoryId } = req.body;

            await SubCategoryService.create({ name, categoryId }, transaction);

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
            const { name, categoryId } = req.body;

            const isExists = await SubCategoryService.detail(id);

            if (!isExists) throw errorList.notFound;

            await SubCategoryService.update(id, { name, categoryId }, transaction);

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

            const data = await SubCategoryService.detail(id);
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
            const { page, size, search, sort, order, name } = req.query;
            const { userId } = (req as any).user;

            const limit = size ? Number(size) : 10;
            const offset = page ? (Number(page) - 1) * limit : 0;

            const data = await SubCategoryService.index({
                limit,
                offset,
                search,
                name,
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

            const data = await SubCategoryService.delete(id, transaction);

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
            const data = await SubCategoryService.getAll(userId);
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }
}
