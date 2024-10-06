import { NextFunction, Request, Response } from 'express';
import { customError, errorList } from '../../helpers/errors';
import { decrypt } from '../../libraries';
import { UserService } from '../services';

interface Payload {
    userId: string;
}

export class Authentication {
    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { authorization } = req.headers;
            if (!authorization) throw errorList.accessTokenNotFound;

            const token = authorization?.split(' ') || [];
            const accessToken = token[1];

            // Decrypting the access token to extract the payload
            const payload = decrypt(accessToken as string) as Payload;

            // Fetching user details based on the payload
            const user = await UserService.findById(payload.userId);

            if (!user) throw errorList.invalidAccessToken;

            if (!user?.isVerified) {
                throw customError(400, 'Please verify your email');
            }

            // Storing the payload in the request object for further use
            (req as any).user = payload;

            next();
        } catch (error) {
            next(error);
        }
    }
}
