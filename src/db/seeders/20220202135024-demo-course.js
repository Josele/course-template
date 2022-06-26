'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Courses', [{
        name: 'Spanish',
        season: 2,
        year:2022,
        createdAt: new Date(),
        updatedAt: new Date()
    }], {});
    
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Courses', null, {});
     
  }
};
