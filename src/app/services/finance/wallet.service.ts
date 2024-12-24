import { Transaction } from 'sequelize';
import { whereFilter } from '../../../helpers/utils';
import { IDefaultQueryProps } from '../../../interfaces/default';

const { Wallet } = require('../../../db/models');

interface ICreateProps {
    type: string;
    name: string;
    balance: number;
    currency: string;
    description: string;
    userId: string;
}

interface IGetAllProps extends IDefaultQueryProps {
    type?: string;
    name?: string;
    currency?: string;
    userId: string;
}

const defaultInclude = [];

export class WalletService {
    static async create(params: ICreateProps, transaction: Transaction) {
        return await Wallet.create(params, { transaction });
    }

    static async update(
        id: string,
        userId: string,
        params: Partial<ICreateProps>,
        transaction: Transaction
    ) {
        return await Wallet.update(params, { where: { id, userId }, transaction });
    }

    static async detail(id: string, userId: string) {
        return await Wallet.findOne({
            where: { id, userId },
            attributes: {
                exclude: ['userId', 'createdAt', 'updatedAt']
            }
        });
    }

    static async index(query: IGetAllProps) {
        const { limit, offset, order, sort, search, name, type, currency, userId } = query;

        const where = whereFilter({ search, dataToFilter: { name, type, currency, userId } });

        const sortOption = [[sort, order]];

        return await Wallet.findAndCountAll({
            where,
            limit,
            offset,
            distinct: true,
            order: sortOption,
            // include: defaultInclude,
            subQuery: false,
            attributes: {
                exclude: ['userId']
            }
        });
    }

    static async getAll(userId: string) {
        return await Wallet.findAll({ where: { userId }, attributes: ['id', 'type', 'name'] });
    }

    static async delete(id: string, userId: string, transaction: Transaction) {
        const count = await Wallet.destroy({ where: { id, userId }, transaction });
        return count;
    }
}
