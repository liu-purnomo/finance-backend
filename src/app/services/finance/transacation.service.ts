import { Transaction as SequelizeTransaction } from 'sequelize';
import { whereFilter } from '../../../helpers/utils';
import { IDefaultQueryProps } from '../../../interfaces/default';

const { Transaction, Wallet } = require('../../../db/models');

interface ICreateProps {
    amount: number;
    description?: string;
    transactionDate: Date;
    type: string;
    category: string;
    walletId: string;
    userId: string;
}

interface IGetAllProps extends IDefaultQueryProps {
    description?: string;
    wallet?: string;
    userId: string;
}

const defaultInclude = [
    {
        model: Wallet,
        attributes: ['id', 'name']
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
        const { limit, offset, order, sort, search, userId, wallet, description } = query;

        const where = whereFilter({
            search,
            dataToFilter: { userId, '$wallet.name$': wallet, description }
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

    static async getAll(userId: string) {
        return await Transaction.findAll({ where: { userId } });
    }
}
