import {
    Sequelize,
    DataTypes
} from 'sequelize';

export interface UserAttributes {
    name ? : string;
    role ? : number
    pwdHash ? : string;
    email ? : string;

}

export interface UserInstance {
    id: number;
    createdAt: Date;
    updatedAt: Date;

    name: string;
    role: number
    pwdHash: string;
    email: string;

}

export = (sequelize: Sequelize, DataTypes: DataTypes) => {
    var User = sequelize.define('User', {
        name: DataTypes.STRING,
        role: DataTypes.NUMBER,
        pwdHash: DataTypes.STRING,
        email: DataTypes.STRING
    });

    User.associate = function(models) {
        // associations can be defined here
    };

    return User;
};
