import StatusCodes from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import { UserRoles } from '@entities/User';
import { cookieProps } from '@shared/constants';
import { JwtService } from '@shared/JwtService';



const jwtService = new JwtService();
const { UNAUTHORIZED } = StatusCodes;

// Middleware to verify if user is has an account
export const checkJwt = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get json-web-token
        const jwt = req.signedCookies[cookieProps.key];
        if (!jwt) {
            throw Error('JWT not present in signed cookie.');
        }
        // Make sure user role is an admin
        const clientData = await jwtService.decodeJwt(jwt);
        if (clientData.role === UserRoles.Standard
			|| clientData.role === UserRoles.Admin) {
				res.sessionUser = clientData;
				next();
			} else {
            throw Error('JWT not present in signed cookie.');
        }
    } catch (err) {
        return res.status(UNAUTHORIZED).json({
            error: err.message,
        });
    }
};

// Middleware to verify if role
export const checkRole = (roles: UserRoles) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		//Get the user ID from previous midleware
		const id = res.sessionUser.id;

		//Get user role from the database
		//const userRepository = getRepository(User);
		//let user: User;
		//try {
		//	user = await userRepository.findOneOrFail(id);
		//} catch (id) {
		//	res.status(401).send();
		//}

		//Check if array of authorized roles includes the user's role

		if (res.sessionUser.role === UserRoles.Admin)
		{
			next();
		}else
		{
			return res.status(UNAUTHORIZED).json({
				error: 'UNAUTHORIZED',
			});
		}
	
	};
};

// Middleware to verify if user is an admin
export const adminMW = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get json-web-token
        const jwt = req.signedCookies[cookieProps.key];
        if (!jwt) {
            throw Error('JWT not present in signed cookie.');
        }
        // Make sure user role is an admin
        const clientData = await jwtService.decodeJwt(jwt);
        if (clientData.role === UserRoles.Admin) {
            res.sessionUser = clientData;
            next();
        } else {
            throw Error('JWT not present in signed cookie.');
        }
    } catch (err) {
        return res.status(UNAUTHORIZED).json({
            error: err.message,
        });
    }
};
