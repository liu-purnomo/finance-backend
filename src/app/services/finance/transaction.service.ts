import { Op, Transaction as SequelizeTransaction } from 'sequelize';
import { whereFilter } from '../../../helpers/utils';
import { IDefaultQueryProps } from '../../../interfaces/default';

const { Transaction, Wallet, Category } = require('../../../db/models');

interface ICreateProps {
    amount: number;
    description?: string;
    transactionDate: Date;
    type: string;
    categoryId: string;
    walletId: string;
    userId: string;
}

interface IGetAllProps extends IDefaultQueryProps {
    description?: string;
    wallet?: string;
    userId: string;
    category?: string;
    subCategory?: string;
}

const defaultInclude = [
    {
        model: Wallet,
        attributes: ['id', 'name']
    },
    {
        model: Category,
        attributes: ['id', 'name', 'icon']
    }
];

export class TransactionService {
    static async create(params: ICreateProps, transaction: SequelizeTransaction) {
        return await Transaction.create(params, { transaction });
    }

    static async update(
        id: string,
        userId: string,
        params: Partial<ICreateProps>,
        transaction: SequelizeTransaction
    ) {
        return await Transaction.update(params, { where: { id, userId }, transaction });
    }

    static async detail(id: string, userId: string) {
        return await Transaction.findOne({
            where: { id, userId },
            include: defaultInclude
        });
    }

    static async index(query: IGetAllProps) {
        const { limit, offset, order, sort, search, userId, wallet, description, category } = query;

        const where = whereFilter({
            search,
            dataToFilter: {
                userId,
                '$wallet.name$': wallet,
                description,
                '$Category.name$': category
            }
        });

        const sortOption = [[sort, order]];

        return await Transaction.findAndCountAll({
            where,
            limit,
            offset,
            distinct: true,
            order: sortOption,
            include: defaultInclude,
            subQuery: false
        });
    }

    static async summary(walletId: string, startDate: Date, endDate: Date) {
        return await Transaction.findAll({
            where: {
                walletId,
                transactionDate: {
                    [Op.gte]: startDate,
                    [Op.lte]: endDate
                }
            },
            include: {
                model: Category,
                attributes: ['id', 'icon', 'name']
            },
            order: [['transactionDate', 'DESC']],
            attributes: {
                exclude: ['categoryId', 'walletId', 'userId', 'createdAt', 'updatedAt']
            }
        });
    }

    static async getAll(userId: string) {
        return await Transaction.findAll({ where: { userId } });
    }

    static async delete(id: string, userId: string, transaction: SequelizeTransaction) {
        const count = await Transaction.destroy({ where: { id, userId }, transaction });
        return count;
    }
}
