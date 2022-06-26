import { HasManyGetAssociationsMixin, HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyAddAssociationMixin, HasManyCreateAssociationMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyCountAssociationsMixin, Model, Optional } from 'sequelize';
import { ICourseDao} from '@entities/Course'
export enum UserRoles {
    Standard,
    Admin,
}

// Interface for User
export interface IUser {

    name: string;
    email: string;
    pwdHash: string;
    role: UserRoles;
}

// Interface for User's BD attributes
export interface IUserDaoAttributes {

    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    email: string;
    pwdHash: string;
    role: UserRoles;
}

// Interface for User's BD attributes but declaring some parameters as optional for sequelizer models
// Some fields are optional when calling UserModel.create() or UserModel.build()
interface UserCreationAttributes extends Optional<IUserDaoAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

// Interface for User's BD instances extending sequelizer model
export interface IUserDao extends Model<IUserDaoAttributes, UserCreationAttributes>, IUserDaoAttributes{

    // Since TS cannot determine model association at compile time
    // we have to declare them here purely virtually
    // these will not exist until `Model.init` was called.
    getCourses: HasManyGetAssociationsMixin<ICourseDao>;
    setCourses: HasManySetAssociationsMixin<ICourseDao, number>;
    addCourses: HasManyAddAssociationsMixin<ICourseDao, number>;
    addCourse: HasManyAddAssociationMixin<ICourseDao, number>;
    createCourse: HasManyCreateAssociationMixin<ICourseDao, 'id'>;
    removeCourse: HasManyRemoveAssociationMixin<ICourseDao, number>;
    removeCourses: HasManyRemoveAssociationsMixin<ICourseDao, number>;
    hasCourse: HasManyHasAssociationMixin<ICourseDao, number>;
    hasCourses: HasManyHasAssociationsMixin<ICourseDao, number>;
    countCourses: HasManyCountAssociationsMixin;



}

// Possible future implementation, implementing the ICourseDao.
//
//export class User implements IUser {
//
//    public id: number;
//    public name: string;
//    public email: string;
//    public role: UserRoles;
//    public pwdHash: string;
//
//
//    constructor(
//        nameOrUser?: string | IUser,
//        email?: string,
//        role?: UserRoles,
//        pwdHash?: string,
//        id?: number,
//    ) {
//        if (typeof nameOrUser === 'string' || typeof nameOrUser === 'undefined') {
//            this.name = nameOrUser || '';
//            this.email = email || '';
//            this.role = role || UserRoles.Standard;
//            this.pwdHash = pwdHash || '';
//            this.id = id || -1;
//        } else {
//            this.name = nameOrUser.name;
//            this.email = nameOrUser.email;
//            this.role = nameOrUser.role;
//            this.pwdHash = nameOrUser.pwdHash;
//            this.id = nameOrUser.id;
//        }
//    }
//}
