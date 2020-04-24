﻿require('dotenv/config');

module.exports = {
  dialect: process.env.DB_CONN,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  seederStorage: 'sequelize',
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
