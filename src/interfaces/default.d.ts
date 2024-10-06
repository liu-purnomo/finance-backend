import { NextFunction, Request, Response } from 'express';

export type ControllerFunction = (req: Request, res: Response, next: NextFunction) => void;

export interface IDefaultQueryProps {
    limit: number;
    offset: number;
    search: string | undefined | null;
    sort: string;
    order: string;
}

export type Optional<T> = {
    [P in keyof T]?: T[P];
};

export interface DefaultSchemaInterface {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
}

export interface ICustomError extends Error {
    name: string;
    code: number;
    errors?: { message: string }[];
}
