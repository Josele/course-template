import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import UserDao from '@daos/User/UserDao.mock';
import { paramMissingError } from '@shared/constants';

const userDao = new UserDao();
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
		const user = await userDao.getOneById(Number(id));
		return res.status(OK).json({user});
	}


}
export default ProfileController;
