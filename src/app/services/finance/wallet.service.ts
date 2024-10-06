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

    static async update(id: string, params: Partial<ICreateProps>, transaction: Transaction) {
        return await Wallet.update(params, { where: { id }, transaction });
    }

    static async detail(id: string) {
        return await Wallet.findByPk(id);
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
            subQuery: false
        });
    }

    static async getAll(userId: string) {
        return await Wallet.findAll({ where: { userId }, attributes: ['id', 'type', 'name'] });
    }

    static async delete(id: string, transaction: Transaction) {
        const count = await Wallet.destroy({ where: { id }, transaction });

        return count;
    }
}
