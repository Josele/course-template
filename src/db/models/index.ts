const path = require('path');

//Load ORM
import * as sequelize from 'sequelize';
//Import the definition of the tables
import { userModel } from '@models/user';
import { courseModel } from '@models/course';
import { IUserDao } from '@entities/User';
import { ICourseDao } from '@entities/Course';

// Environment variable to define the URL of the data base to use.
// To use SQLite data base:
//    DATABASE_URL = sqlite:quiz.sqlite
const url = process.env.DATABASE_URL || "sqlite:./src/db/db.sqlite";

const options = { logging: false};
// Open database connection
const dbConfig  = new sequelize.Sequelize(url, options);


//Create tables and export them
export const userDB = userModel(dbConfig, sequelize.DataTypes);
export const courseDB = courseModel(dbConfig, sequelize.DataTypes);
// Create n:m relationship
courseDB.belongsToMany(userDB, {foreignKey: 'UserId',
                          otherKey: 'CourseId',
                            through: 'UserCourses'});
userDB.belongsToMany(courseDB, {foreignKey: 'CourseId',
                            otherKey: 'UserId',
                            through: 'UserCourses'});
// Exporing

//Create tables
dbConfig.sync()
//    .then(() => console.log('Data Base created succesfully'))
    .catch(error => {
        console.log("Error creating the data base tables:",error);
        process.exit(1);

    });
