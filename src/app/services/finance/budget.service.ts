import { Transaction } from 'sequelize';
import { whereFilter } from '../../../helpers/utils';
import { IDefaultQueryProps } from '../../../interfaces/default';

const { Budget, Category } = require('../../../db/models');

interface ICreateProps {
    description: string;
    amount: number;
    periodStart: Date;
    periodEnd: Date;
    userId: string;
    categoryId: string;
}

interface IGetAllProps extends IDefaultQueryProps {
    description?: string;
    amount?: string;
    category?: string;
    periodStart?: string;
    periodEnd?: string;
    userId: string;
}

const defaultInclude = [
    {
        model: Category,
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'userId']
        }
    }
];

export class BudgetService {
    static async create(params: ICreateProps, transaction: Transaction) {
        return await Budget.create(params, { transaction });
    }

    static async update(
        id: string,
        userId: string,
        params: Partial<ICreateProps>,
        transaction: Transaction
    ) {
        return await Budget.update(params, { where: { id, userId }, transaction });
    }

    static async detail(id: string, userId: string) {
        return await Budget.findOne({
            where: { id, userId },
            include: defaultInclude
        });
    }

    static async index(query: IGetAllProps) {
        const {
            limit,
            offset,
            order,
            sort,
            search,
            description,
            category,
            userId,
            amount,
            periodStart,
            periodEnd
        } = query;

        const where = whereFilter({
            search,
            dataToFilter: {
                description,
                '$Category.name$': category,
                userId,
                amount,
                periodStart,
                periodEnd
            }
        });

        const sortOption = [[sort, order]];

        return await Budget.findAndCountAll({
            where,
            limit,
            offset,
            distinct: true,
            order: sortOption,
            include: defaultInclude,
            subQuery: false
        });
    }

    static async getAll(userId: string) {
        return await Budget.findAll({ where: { userId } });
    }

    static async delete(id: string, userId: string, transaction: Transaction) {
        const count = await Budget.destroy({ where: { id, userId }, transaction });

        return count;
    }
}
