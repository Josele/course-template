import { HasManyGetAssociationsMixin, HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyAddAssociationMixin, HasManyCreateAssociationMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyCountAssociationsMixin, Model, Optional } from 'sequelize';
import { IUserDao} from '@entities/User';
export enum CourseSeason {
    First4mester,
    Second4mester,
}

// Interface for Course
export interface ICourse{
    
    name: string;
    year: number;
    season: CourseSeason;
}

// Interface for Course's BD attributes
export interface ICourseDaoAttributes {

    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    year: number;
    season: CourseSeason;
}

// Interface for Course's BD attributes but declaring some parameters as optional for sequelizer models
// Some fields are optional when calling CourseModel.create() or CourseModel.build()
interface CourseCreationAttributes extends Optional<ICourseDaoAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

// Interface for Course's BD instances extending sequelizer model
export interface ICourseDao extends Model<ICourseDaoAttributes, CourseCreationAttributes>, ICourseDaoAttributes{

    // Since TS cannot determine model association at compile time
    // we have to declare them here purely virtually
    // these will not exist until `Model.init` was called.
    getUsers: HasManyGetAssociationsMixin<IUserDao>;
    setUsers: HasManySetAssociationsMixin<IUserDao, number>;
    addUsers: HasManyAddAssociationsMixin<IUserDao, number>;
    addUser: HasManyAddAssociationMixin<IUserDao, number>;
    createUser: HasManyCreateAssociationMixin<IUserDao, 'id'>;
    removeUser: HasManyRemoveAssociationMixin<IUserDao, number>;
    removeUsers: HasManyRemoveAssociationsMixin<IUserDao, number>;
    hasUser: HasManyHasAssociationMixin<IUserDao, number>;
    hasUsers: HasManyHasAssociationsMixin<IUserDao, number>;
    countUsers: HasManyCountAssociationsMixin;


}

// Possible future implementation, implementing the ICourseDao.
//export class Course implements ICourse {
//
//    public id: number;
//    public name: string;
//    public year: number;
//    public season: CourseSeason;
//
//
//    constructor(
//        nameOrCourse?: string | ICourse,
//        year?: number,
//        season?: CourseSeason,
//        id?: number,
//    ) {
//        if (typeof nameOrCourse === 'string' || typeof nameOrCourse === 'undefined') {
//            this.name = nameOrCourse || '';
//            this.year = year || '';
//            this.season = season || CourseSeason.First4mester;
//            this.id = id || -1;
//        } else {
//            this.name = nameOrCourse.name;
//            this.year = nameOrCourse.year;
//            this.season = nameOrCourse.season;
//            this.id = nameOrCourse.id;
//        }
//    }
//}
