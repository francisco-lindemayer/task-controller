const Sequelize = require("sequelize");
const dbConfig = require("../config/database");
const User = require("../models/User");
const Department = require("../models/Department");
const Task = require("../models/Task");

const connection = new Sequelize(dbConfig);

User.init(connection);
Department.init(connection);
Task.init(connection);
Task.associate({ User, Department });

module.exports = connection;
