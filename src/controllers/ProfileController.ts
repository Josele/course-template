import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import * as UserDao from '@daos/User/UserDao';
import { IUser } from '@entities/User';
import { paramMissingError } from '@shared/constants';

const { BAD_REQUEST, CREATED, OK } = StatusCodes;


class ProfileController{
	/**
	 * Get user profile
	 * 
	 * @param req 
	 * @param res 
	 * @returns 
	 */
	static  getUser = async(req: Request, res: Response) => {
		const { id } = req.params;
		const user = await UserDao.getById(Number(id)) as IUser;
		return res.status(OK).json({user});
	}


}
export default ProfileController;
