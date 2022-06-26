import { IUserDao } from '@entities/User';

import {
    Sequelize,
    DataTypes,
} from 'sequelize';

// Defines the Users Table DB. It has taken the IUsersDao as model,
// which extends sequelize model
export function userModel(sequelize: Sequelize, dataTypes: typeof DataTypes) {
    return sequelize.define<IUserDao>('Users', {
            id: {
                type: dataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },            
            name: {
                type: dataTypes.STRING,
                validate: {
                    notEmpty: {msg: 'Missing username'},
                },
            },
            role: {
                type: dataTypes.NUMBER,
                allowNull: false,
                
            },
            email: {type: dataTypes.STRING},
            pwdHash: {type: dataTypes.STRING},
            createdAt: {
                type: dataTypes.DATE,
                allowNull: false,
                defaultValue: dataTypes.NOW
            },
            updatedAt: {
                type: dataTypes.DATE,
                allowNull: false,
                defaultValue: dataTypes.NOW
           }
    });


};
