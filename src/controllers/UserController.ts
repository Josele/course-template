import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import UserDao from '@daos/User/UserDao.mock';
import { paramMissingError } from '@shared/constants';

const userDao = new UserDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;


class UserController{
	/**
	 * Get all users.
	 * 
	 * @param req 
	 * @param res 
	 * @returns 
	 */
	static  getAllUsers = async(req: Request, res: Response) => {
		const users = await userDao.getAll();
		return res.status(OK).json({users});
	}


	/**
	 * Add one user.
	 * 
	 * @param req 
	 * @param res 
	 * @returns 
	 */
	static addOneUser = async(req: Request, res: Response) => {
		const { user } = req.body;
		if (!user) {
			return res.status(BAD_REQUEST).json({
				error: paramMissingError,
			});
		}
		await userDao.add(user);
		return res.status(CREATED).end();
	}


	/**
	 * Update one user.
	 * 
	 * @param req 
	 * @param res 
	 * @returns 
	 */
	static updateOneUser = async(req: Request, res: Response) => {
		const { user } = req.body;
		if (!user) {
			return res.status(BAD_REQUEST).json({
				error: paramMissingError,
			});
		}
		user.id = Number(user.id);
		await userDao.update(user);
		return res.status(OK).end();
	}


	/**
	 * Delete one user.
	 * 
	 * @param req 
	 * @param res 
	 * @returns 
	 */
	static deleteOneUser = async(req: Request, res: Response) => {
		const { id } = req.params;
		await userDao.delete(Number(id));
		return res.status(OK).end();

	}
}
export default UserController;