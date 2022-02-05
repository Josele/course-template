'use strict';

module.exports = {
  async up (queryInterface, DataTypes) {
    
      await queryInterface.createTable('UserCourses', {

          createdAt: {
              allowNull: false,
              type: DataTypes.DATE,
          },
          updatedAt: {
              allowNull: false,
              type: DataTypes.DATE,
          },
          CourseId: {
              type: DataTypes.INTEGER,
              primaryKey: true,
          },
          UserId: {
              type: DataTypes.INTEGER,
              primaryKey: true,
          },
      });
    
  },

  async down (queryInterface, DataTypes) {
    await queryInterface.dropTable('UserCourses');
    
  }
};
