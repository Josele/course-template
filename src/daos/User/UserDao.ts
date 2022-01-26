import { IUser } from '@entities/User';
const Sequelize = require("sequelize");
const { models } = require("../../models/index");

export interface IUserDao {
    getOne: (email: string) => Promise<IUser | null>;
    getAll: () => Promise<IUser[]>;
    add: (user: IUser) => Promise<void>;
    update: (user: IUser) => Promise<void>;
    delete: (id: number) => Promise<void>;
}

class UserDao implements IUserDao {


    /**
     * @param email
     */
    public getOne(email: string): Promise<IUser | null> {
        const { user } = await models.User.find({
            where: {
                email: email
            }
        });
        return Promise.resolve(user);
    }


    /**
     *
     */
    public getAll(): Promise<IUser[]> {
        const users = await models.User.findAll();
        return Promise.resolve(users);
    }


    /**
     *
     * @param user
     */
    public async add(user: IUser): Promise<void> {
         // TODO
        return Promise.resolve(undefined);
    }


    /**
     *
     * @param user
     */
    public async update(user: IUser): Promise<void> {
         // TODO
        return Promise.resolve(undefined);
    }


    /**
     *
     * @param id
     */
    public async delete(id: number): Promise<void> {
         // TODO
        return Promise.resolve(undefined);
    }
}

export default UserDao;
