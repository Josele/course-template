import { IUser } from '@entities/User';

import {
    Sequelize,
    DataTypes,
    Model
} from 'sequelize';

export interface UserAttributes {
    name: string;
    role: number;
    pwdHash: string;
    email: string;

}



export interface UserModel extends Model{
    id: number;
    name: string;
    email: string;
    pwdHash: string;
    role: number;
    createdAt: string;
    updatedAt: string;
}

export function user(sequelize: Sequelize, dataTypes: typeof DataTypes) {
    return sequelize.define<UserModel>('Users', {
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
//            createdAt: {
//                type: dataTypes.DATE,
//                allowNull: false,
//                defaultValue: dataTypes.NOW
//            },
//            updatedAt: {
//                type: dataTypes.DATE,
//                allowNull: false,
//                defaultValue: dataTypes.NOW
//           }
    });


};
