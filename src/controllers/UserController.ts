import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { paramMissingError } from '@shared/constants';
import { pwdSaltRounds } from '@shared/constants';
import { UserRoles } from '@entities/User';
import * as UserDao from '@daos/User/UserDao';
import { IUserDaoAttributes } from '@entities/User';

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
		const users = await UserDao.getAll() as IUserDaoAttributes[];
		return res.status(OK).json({users});
	}

	/**
	 * Get my users.
	 * 
	 * @param req 
	 * @param res 
	 * @returns 
	 */
	static	getMyUser = async(req: Request, res: Response) => {
		const id =  res.sessionUser.id;
		const user = await UserDao.getById(id) as IUserDaoAttributes;
		if (!user) {
			return res.status(BAD_REQUEST).json({
				error: paramMissingError,
			});
		}
	    return res.status(OK).json({user});
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
        const password = req.body.password;
        if (!user || !password) {
            return res.status(BAD_REQUEST).json({
                error: paramMissingError,
            });
        }
        const salt = await bcrypt.genSalt(pwdSaltRounds);
        user.pwdHash = await bcrypt.hash(req.body.password, salt);
        user.role = UserRoles.Standard;         
        await UserDao.add(user);
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
		await UserDao.update(user);
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
		await UserDao.deleteOne(Number(id));
		return res.status(OK).end();

	}
}
export default UserController;
