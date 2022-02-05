const path = require('path');

//Load ORM
import * as sequelize from 'sequelize';
//Import the definition of the tables
import { user } from './user';
import { course } from './course';

// Environment variable to define the URL of the data base to use.
// To use SQLite data base:
//    DATABASE_URL = sqlite:quiz.sqlite
const url = process.env.DATABASE_URL || "sqlite:db.sqlite";

const options = { logging: false};
// Open database connection
const dbConfig  = new sequelize.Sequelize(url, options);


//Create tables and export them
export const User = user(dbConfig, sequelize.DataTypes);
export const Course = course(dbConfig, sequelize.DataTypes);

// Create n:m relationship
Course.belongsToMany(User, {foreignKey: 'UserId',
                            otherKey: 'CourseId',
                            through: 'UserCourses'});
User.belongsToMany(Course, {foreignKey: 'CourseId',
                            otherKey: 'UserId',
                            through: 'UserCourses'});
// Exporing

//Create tables
dbConfig.sync()
    .then(() => console.log('Data Base created succesfully'))
    .catch(error => {
        console.log("Error creating the data base tables:",error);
        process.exit(1);

    });

