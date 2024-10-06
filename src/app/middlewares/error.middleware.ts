import { NextFunction, Request, Response } from 'express';

interface ICustomError extends Error {
    name: string;
    code: number;
    errors?: { message: string }[];
}

/**
 * Error handler middleware to handle and format errors in the application.
 * @param {ICustomError} err - The error object.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 */
export const errorHandler = async (
    err: ICustomError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let code = err.code || 500;
    let msg = err.message || 'Something went wrong!';

    // Logging the error in development environment
    if (process.env.NODE_ENV === 'development') {
        console.error(JSON.stringify(err, null, 2), '<<<<<< ERROR');
        console.error(err.name, '<<<<<< ERROR NAME');
        console.error(err.message, '<<<<<<< ERROR MESSAGE');
    }

    // Handling Sequelize validation errors
    if (err.name === 'SequelizeValidationError') {
        code = 400;
        msg = err.errors && err.errors.length > 0 ? err.errors[0].message : 'Validation error';
    }

    // Handling Sequelize unique constraint errors
    if (err.name === 'SequelizeUniqueConstraintError') {
        code = 400;
        msg = (err.errors as any)[0].message;
    }

    // Handling Sequelize database and foreign key constraint errors
    if (
        err.name === 'SequelizeDatabaseError' ||
        err.name === 'SequelizeForeignKeyConstraintError'
    ) {
        code = 500;
        msg = err.message;
    }

    // Handling JsonWebToken errors
    if (err.name === 'JsonWebTokenError') {
        code = 403;
        msg = 'invalid access token';
    }

    // Handling expired token errors
    if (err.name === 'TokenExpiredError') {
        code = 403;
        msg = 'Token expired, please login again';
    }

    if (err.name === 'MulterError' || err.message === 'Unsupported file type') {
        code = 400;
        msg = err.message;
    }

    // Handling custom errors
    if (err.name === 'customError') {
        code = err.code;
        msg = err.message;
    }

    // Constructing the response object
    const response = {
        code: code,
        message: msg
    };

    // Sending the formatted error response
    res.status(code).json(response);
};
