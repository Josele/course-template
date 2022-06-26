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
        // Make sure the user has a role
        const clientData = await jwtService.decodeJwt(jwt);
        if (clientData.role === UserRoles.Standard
			|| clientData.role === UserRoles.Admin) {
				res.sessionUser = clientData;
				next();
			} else {
            throw Error('JWT not present in signed cookie.');
        }
    } catch (err: unknown) {
        if (err instanceof Error) {
            return res.status(UNAUTHORIZED).json({
                error: err.message,
            });
        }else{
            return res.status(500);
        }
    }
};

// Middleware to verify if role
export const checkRole = (roles: UserRoles) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		//Get the user ID from previous midleware
		const id = res.sessionUser.id;


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


// Middleware to verify if role
export const checkOwnerId = () => {
	return async (req: Request, res: Response, next: NextFunction) => {

		//Get the user ID from previous midleware
		//Check if the id don't belongs to the cookie
		const  id  = req.params;
		if (Number(id) == res.sessionUser.id)
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
