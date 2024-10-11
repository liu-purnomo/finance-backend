import { Transaction } from 'sequelize';
import { whereFilter } from '../../../helpers/utils';
import { IDefaultQueryProps } from '../../../interfaces/default';

const { Category } = require('../../../db/models');

interface ICreateProps {
    name: string;
    icon: string;
    userId: string;
}

interface IGetAllProps extends IDefaultQueryProps {
    name?: string;
    userId: string;
}

export class CategoryService {
    static async create(params: ICreateProps, transaction: Transaction) {
        return await Category.create(params, { transaction });
    }

    static async update(
        id: string,
        userId: string,
        params: Partial<ICreateProps>,
        transaction: Transaction
    ) {
        return await Category.update(params, { where: { id, userId }, transaction });
    }

    static async detail(id: string, userId: string) {
        return await Category.findOne({
            where: { id, userId }
        });
    }

    static async index(query: IGetAllProps) {
        const { limit, offset, order, sort, search, name, userId } = query;

        const where = whereFilter({ search, dataToFilter: { name, userId } });

        const sortOption = [[sort, order]];

        return await Category.findAndCountAll({
            where,
            limit,
            offset,
            distinct: true,
            order: sortOption,
            subQuery: false
        });
    }

    static async getAll(userId: string) {
        return await Category.findAll({ where: { userId }, attributes: ['id', 'name'] });
    }

    static async delete(id: string, userId: string, transaction: Transaction) {
        const count = await Category.destroy({ where: { id, userId }, transaction });
        return count;
    }
}
