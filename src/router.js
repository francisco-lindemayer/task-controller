const express = require('express');
const router = express.Router();
const userRoutes = require('./routes/user');
const departmentRoutes = require('./routes/department');
const taskRoutes = require('./routes/task');
const reportRoutes = require('./routes/report');

userRoutes(router);
departmentRoutes(router);
taskRoutes(router);
reportRoutes(router);

module.exports = router;
