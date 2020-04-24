'use strict';
const bcrypt = require('bcryptjs');
const slug = require('../../utils/slugRole');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'John Doe',
          email: 'john@anyemail.com',
          password: await bcrypt.hash('123456', 10),
          role: slug.Admin,

          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Jane Doe',
          email: 'jane@anyemail.com',
          password: await bcrypt.hash('123456', 10),
          role: slug.Analyzer,

          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Richard Roe',
          email: 'richard@anyemail.com',
          password: await bcrypt.hash('123456', 10),
          role: slug.User,

          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('users', null, {});
  },
};
