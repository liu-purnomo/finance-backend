import { Transaction } from 'sequelize';
import { whereFilter } from '../../../helpers/utils';
import { IDefaultQueryProps } from '../../../interfaces/default';

const { User } = require('../../../db/models');

interface ICreateProps {
    name: string;
    email: string;
    password: string;
    token?: string;
}

interface IGetAllProps extends IDefaultQueryProps {
    name?: string;
    email?: string;
}

// const defaultInclude = []

export class UserService {
    static async create(params: ICreateProps, transaction: Transaction) {
        return await User.create(params, { transaction });
    }

    static async update(id: string, params: Partial<ICreateProps>, transaction: Transaction) {
        return await User.update(params, { where: { id }, transaction });
    }

    static async findById(id: string) {
        return await User.findByPk(id);
    }

    static async findByEmail(email: string) {
        return await User.findOne({ where: { email } });
    }

    static async index(query: IGetAllProps) {
        const { limit, offset, order, sort, search, name, email } = query;

        const where = whereFilter({ search, dataToFilter: { name, email } });

        const sortOption = [[sort, order]];

        return await User.findAndCountAll({
            where,
            limit,
            offset,
            distinct: true,
            order: sortOption,
            // include: defaultInclude,
            subQuery: false
        });
    }

    static async getAll() {
        return await User.findAll({ attributes: ['id', 'name'] });
    }

    static async delete(id: string, transaction: Transaction) {
        const count = await User.destroy({ where: { id, transaction } });
        return count;
    }
}
