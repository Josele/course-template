import { IUser, IUserDao } from '@entities/User';
import { userDB } from "@models/index";

/**
 * Module to defer objects from database operations
 * Functions accept IUserDao | IUser and return IUser.
 */

/**
 * @param email
 */
export async function getByEmail(email: string): Promise< IUserDao | null> {
    let user  = await userDB.findOne({
        where: {
            email: email,
        }
    });
    return Promise.resolve(user);
}


/**
 * 
 */
export async function getAll(): Promise<IUserDao[]> {
    const users = await userDB.findAll();
    return Promise.resolve(users);
}
/**
 *
 * @param user
 */
export async function add(user: IUserDao | IUser): Promise<void> {
    await userDB.create(user);
    return Promise.resolve(undefined);
}


/**
 *
 * @param id
 */
export async function getById(id: number): Promise< IUserDao | null> {
    let user  = await userDB.findOne({
        where: {
            id: id,
        }
    });
    return Promise.resolve(user);
}


/**
 *
 * @param user
 */
export async function update( id: number, user: IUserDao | IUser): Promise<void> {
    let userEntry  = await userDB.findOne({
        where: {
            id: id,
        }
    });
    if (userEntry===null)throw new Error('User not found');
    userEntry.update(user);
    return Promise.resolve(undefined);
}


/**
 *
 * @param id
 */
export async function deleteOne( id: number ): Promise<void> {
    let n: number = await userDB.destroy(
        { where: {id: id}}
    );
    if (n===0)throw new Error('User not found'); 
    return Promise.resolve(undefined);
}
    
