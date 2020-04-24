'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      'tasks',
      [
        {
          user_id: 1,
          department_id: 1,
          description: 'Tarefa teste 1',
          status: 'Aberto',
          created_at: new Date(2020, 5, 10),
          updated_at: new Date(2020, 5, 10),
        },
        {
          user_id: 1,
          department_id: 1,
          description: 'Tarefa teste 2',
          status: 'Em andamento',
          created_at: new Date(2020, 5, 15, 12),
          updated_at: new Date(2020, 5, 16, 1),
          started_at: new Date(2020, 5, 16, 1),
        },
        {
          user_id: 1,
          department_id: 1,
          description: 'Tarefa teste 3',
          status: 'Finalizado',
          created_at: new Date(2020, 5, 17, 1),
          updated_at: new Date(2020, 5, 17, 7),
          started_at: new Date(2020, 5, 17, 5),
          completed_at: new Date(2020, 5, 17, 7),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('tasks', null, {});
  },
};
