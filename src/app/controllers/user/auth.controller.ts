import { NextFunction, Request, Response } from 'express';
import { customError, errorList, notFoundError, requireError } from '../../../helpers/errors';
import { notificationEmail } from '../../../helpers/templates';
import { Generator } from '../../../helpers/utils';
import { comparePassword, encrypt, hashPassword, sendEmail } from '../../../libraries';
import { UserService } from '../../services';

const { sequelize } = require('../../../db/models');

export class AuthController {
    static async register(req: Request, res: Response, next: NextFunction) {
        const transaction = await sequelize.transaction();
        try {
            const { email, password, name } = req.body;

            if (!email || !password) {
                throw requireError('Email and Password');
            }

            const token = Generator.key({
                length: 4,
                isUppercase: true,
                isLowercase: false
            });

            const data = await UserService.create(
                {
                    email,
                    token,
                    name,
                    password: hashPassword(password),
                    isVerified: false
                },
                transaction
            );

            const url = `${process.env.PUBLIC_URL}/auth/verify?email=${email}&code=${token}`;

            const emailContent = notificationEmail({
                buttonUrl: url,
                receiver: name,
                message: `<b>${token}</b> is your code.
<br/>    
<br/>    
Click here to verify your account: ${url}
          `
            });

            await sendEmail({
                email: email,
                subject: 'Verify your account',
                content: emailContent
            });

            const response = {
                status: 'success',
                message: 'Email verification has been sent to your email'
            };

            await transaction.commit();
            res.status(200).json(response);
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }

    static async verify(req: Request, res: Response, next: NextFunction) {
        const transaction = await sequelize.transaction();
        try {
            const { email, code } = req.body;
            if (!email || !code) {
                throw requireError('Email and Code');
            }

            const user = await UserService.findByEmail(email);
            if (!user) {
                throw customError(400, 'Invalid Email or Code');
            }

            if (user?.isVerified) {
                throw customError(400, 'Email already verified');
            }

            if (user?.token !== code) {
                throw errorList.invalidToken;
            }

            await UserService.update(user?.id, { token: null, isVerified: true }, transaction);

            const response = {
                status: 'success',
                message: 'Email verified successfully'
            };

            transaction.commit();
            res.status(200).json(response);
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                throw requireError('Email and Password');
            }

            const user = await UserService.findByEmail(email);
            if (!user) {
                throw errorList.invalidLogin;
            }

            if (!user?.isVerified) {
                throw customError(400, 'Please verify your email');
            }

            const isValidPassword = comparePassword(password, user?.password);

            if (!isValidPassword) {
                throw errorList.invalidLogin;
            }

            const accessToken = encrypt({
                userId: user.id,
                email: user.email
            });

            const response = {
                status: 'success',
                message: 'Login successfully',
                data: {
                    token: accessToken,
                    id: user?.id,
                    email: user?.email,
                    name: user?.name
                }
            };

            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }

    static async forgotPassword(req: Request, res: Response, next: NextFunction) {
        const transaction = await sequelize.transaction();
        try {
            const { email } = req.body;

            const user = await UserService.findByEmail(email);
            if (!user) throw notFoundError('User');

            if (user.status !== 'Active') {
                throw errorList.inactiveAccount;
            }

            const token = Generator.key({
                length: 4,
                isUppercase: true
            });

            await UserService.update(
                user.id,
                {
                    token: token
                },
                transaction
            );

            const url = `${process.env.PUBLIC_URL}/auth/reset-password?email=${user.email}&code=${token}`;

            const emailContent = notificationEmail({
                buttonUrl: url,
                receiver: user.name,
                message: `<b>${token}</b> is your code.
<br/>    
<br/>    
Click here to reset your password: ${url}
          `
            });

            await sendEmail({
                email: email,
                subject: 'Reset Password',
                content: emailContent
            });

            //             const message = `*${token}* is your code.

            // Click here to reset your password: ${url}
            //           `;

            //             await sendWhatsapp(user.phone, message);

            //             // await forgotPasswordEmail({
            //             //     email: email,
            //             //     link: link,
            //             //     username: user.name
            //             // });

            const response = {
                status: 'success',
                message: 'Reset password code sent to your phone',
                id: user.id
            };

            await transaction.commit();

            res.status(200).json(response);
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }

    static async resetPassword(req: Request, res: Response, next: NextFunction) {
        const transaction = await sequelize.transaction();
        try {
            const { email, code, password } = req.body;

            if (!email) throw errorList.notFound;
            if (!code) throw requireError('Code');
            if (!password) throw requireError('Password');
            if (password.length <= 5) {
                throw customError(400, 'Password must be at least 6 characters long');
            }
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
            if (!regex.test(password)) throw errorList.invalidLogin;

            const user = await UserService.findByEmail(email);
            if (!user) throw errorList.notFound;
            if (user.token !== code) throw errorList.invalidToken;
            if (user.status !== 'Active') throw errorList.inactiveAccount;

            const hashedPassword = hashPassword(password);

            await UserService.update(
                user.id,
                {
                    token: null,
                    password: hashedPassword
                },
                transaction
            );

            await transaction.commit();
            const response = {
                status: 'success',
                message: 'Password changed successfully'
            };
            res.status(200).json(response);
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }

    static async changePassword(req: Request, res: Response, next: NextFunction) {
        const transaction = await sequelize.transaction();
        try {
            const { id } = (req as any).user;
            const { oldPassword, password } = req.body;

            if (password === oldPassword)
                throw customError(400, 'New password cannot be the same as the old one');

            if (!password || !oldPassword) throw errorList.invalidLogin;
            if (password.length <= 5) {
                throw customError(400, 'Password must be at least 6 characters long');
            }
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
            if (!regex.test(password)) throw errorList.invalidLogin;

            const user = await UserService.findById(id);
            if (!user) throw errorList.notFound;

            const isValidPassword = comparePassword(oldPassword, user.password);
            if (!isValidPassword) throw errorList.invalidOldPassword;

            const hashedPassword = hashPassword(password);

            await UserService.update(
                id,
                {
                    password: hashedPassword
                },
                transaction
            );

            await transaction.commit();

            const response = {
                status: 'success',
                message: 'Password changed successfully'
            };
            res.status(200).json(response);
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }
}
