import bcrypt from 'bcrypt';
import { Request, Response, Router } from 'express';
import StatusCodes from 'http-status-codes';

import * as UserDao from '@daos/User/UserDao';
import { IUserDaoAttributes } from '@entities/User';
import { JwtService } from '@shared/JwtService';
import { paramMissingError, loginFailedErr, cookieProps } from '@shared/constants';

const jwtService = new JwtService();
const { BAD_REQUEST, OK, UNAUTHORIZED } = StatusCodes;


class AuthController {
	/**
	 * Login in a user.
	 * 
	 * @param req 
	 * @param res 
	 * @returns 
	 */
	static login = async(req: Request, res: Response) => {
		// Check email and password present
		const { email, password } = req.body;
		if (!(email && password)) {
			return res.status(BAD_REQUEST).json({
				error: paramMissingError,
			});
		}
		// Fetch user
		const user = await UserDao.getByEmail(email) as IUserDaoAttributes;
		if (!user) {
			return res.status(UNAUTHORIZED).json({
				error: loginFailedErr,
			});
		}
		// Check password
		const pwdPassed = await bcrypt.compare(password, user.pwdHash);
		if (!pwdPassed) {
			return res.status(UNAUTHORIZED).json({
				error: loginFailedErr,
			});
		}
		// Setup Admin Cookie
		const jwt = await jwtService.getJwt({
			id: user.id,
			role: user.role,
		});
		const { key, options } = cookieProps;
		res.cookie(key, jwt, options);
		// Return
		return res.status(OK).end();
	}


	/**
	 * Logout the user.
	 * 
	 * @param req 
	 * @param res 
	 * @returns 
	 */
	static logout = async(req: Request, res: Response) =>{
		const { key, options } = cookieProps;
		res.clearCookie(key, options);
		return res.status(OK).end();
	}
}
export default AuthController;
