import { ICourseDao } from '@entities/Course';

import {
    Sequelize,
    DataTypes,
} from 'sequelize';

// Defines the Courses Table DB. It has taken the ICourseDao as model,
// which extends sequelize model
export function courseModel(sequelize: Sequelize, dataTypes: typeof DataTypes) {
    return sequelize.define<ICourseDao>('Courses', {
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
            season: {
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
