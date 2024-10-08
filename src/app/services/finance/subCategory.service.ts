import { Transaction } from 'sequelize';
import { whereFilter } from '../../../helpers/utils';
import { IDefaultQueryProps } from '../../../interfaces/default';

const { SubCategory, Category } = require('../../../db/models');

interface ICreateProps {
    name: string;
    categoryId: string;
}

interface IGetAllProps extends IDefaultQueryProps {
    name?: string;
    category: string;
}

const defaultInclude = [
    {
        model: Category,
        attributes: ['id', 'name', 'icon']
    }
];

export class SubCategoryService {
    static async create(params: ICreateProps, transaction: Transaction) {
        return await SubCategory.create(params, { transaction });
    }

    static async update(id: string, params: Partial<ICreateProps>, transaction: Transaction) {
        return await SubCategory.update(params, { where: { id }, transaction });
    }

    static async detail(id: string) {
        return await SubCategory.findOne({
            where: { id }
        });
    }

    static async index(query: IGetAllProps) {
        const { limit, offset, order, sort, search, name, category } = query;

        const where = whereFilter({ search, dataToFilter: { name, '$Category.name$': category } });

        const sortOption = [[sort, order]];

        return await SubCategory.findAndCountAll({
            where,
            limit,
            offset,
            include: defaultInclude,
            distinct: true,
            order: sortOption,
            subQuery: false
        });
    }

    static async getAll(categoryId: string) {
        return await SubCategory.findAll({ where: { categoryId }, attributes: ['id', 'name'] });
    }

    static async delete(id: string, transaction: Transaction) {
        const count = await SubCategory.destroy({ where: { id }, transaction });
        return count;
    }
}
