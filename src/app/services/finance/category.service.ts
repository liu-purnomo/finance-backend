import { Transaction } from 'sequelize';
import { whereFilter } from '../../../helpers/utils';
import { IDefaultQueryProps } from '../../../interfaces/default';

const { Category } = require('../../../db/models');

interface ICreateProps {
    name: string;
    icon: string;
    userId: string;
    type: string;
}

interface IGetAllProps extends IDefaultQueryProps {
    name?: string;
    type?: string;
    userId: string;
}

export class CategoryService {
    static async create(params: ICreateProps, transaction: Transaction) {
        return await Category.create(params, { transaction });
    }

    //find or create category based on name and user id
    static async findOrCreate(params: Partial<ICreateProps>, transaction: Transaction) {
        return await Category.findOrCreate({ where: params, transaction });
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
        const { limit, offset, order, sort, type, search, name, userId } = query;

        const where = whereFilter({ search, dataToFilter: { name, type, userId } });

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
        return await Category.findAll({
            where: { userId },
            attributes: ['id', 'type', 'name', 'icon']
        });
    }

    static async delete(id: string, userId: string, transaction: Transaction) {
        const count = await Category.destroy({ where: { id, userId }, transaction });
        return count;
    }
}
