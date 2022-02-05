import { CourseSeason, ICourse } from '@entities/Course';

import {
    Sequelize,
    DataTypes,
    Model
} from 'sequelize';

export interface CourseModel extends Model{
    id: number;
    name: string;
    year: number;
    season: CourseSeason;
    createdAt: string;
    updatedAt: string;
}

export function course(sequelize: Sequelize, dataTypes: typeof DataTypes) {
    return sequelize.define<CourseModel>('Courses', {
            id: {
                type: dataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },            
            name: {
                type: dataTypes.STRING,
                validate: {
                    notEmpty: {msg: 'Missing course name'},
                },
            },
            sesson: {
                type: dataTypes.NUMBER,
                allowNull: false,
                
            },
            year: {type: dataTypes.NUMBER},
            createdAt: {
                type: dataTypes.DATE,
                allowNull: false,
                defaultValue: dataTypes.NOW,
            },
            updatedAt: {
                type: dataTypes.DATE,
                allowNull: false,
                defaultValue: dataTypes.NOW,
            }
    });

};
