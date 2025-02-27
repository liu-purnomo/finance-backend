import { Transaction } from 'sequelize';
import { IDefaultQueryProps } from '../../../interfaces/default';

const { User } = require('../../../db/models');

interface ICreateProps {
    name: string;
    email: string;
    password: string;
    token: string | null;
    isVerified: boolean;
    firstDayOfWeek?: string;
    firstDayOfTheMonth?: number;
    firstMonthOfTheYear?: string;
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
        const user = await User.findByPk(id, {
            attributes: {
                exclude: ['password', 'token', 'updatedAt']
            }
        });
        return user;
    }

    static async getMyProfile(id: string) {
        const user = await User.findByPk(id);
        return user;
    }

    static async findByEmail(email: string) {
        return await User.findOne({ where: { email } });
    }

    static async delete(id: string, transaction: Transaction) {
        const count = await User.destroy({ where: { id, transaction } });
        return count;
    }
}
