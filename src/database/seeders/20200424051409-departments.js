'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      'departments',
      [
        {
          name: 'Comercial',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Financeiro',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Operacional',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('departments', null, {});
  },
};
