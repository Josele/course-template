const path = require('path');

//Load ORM
const Sequilize = require('sequilize');


// Environment variable to define the URL of the data base to use.
// To use SQLite data base:
//    DATABASE_URL = sqlite:quiz.sqlite
const url = process.env.DATABASE_URL || "sqlite:quiz.sqlite";

const sequelize = new Sequelize(url);


//Import the definition of the tables
sequilize.import(path.join(__dirname,'user'));
//Create tables
sequilize.sync()
    .then(() => console.log('Data Base created succesfully'))
    .catch(error => {
        console.log("Error creating the data base tables:",error);
        process.exit(1);

    });
