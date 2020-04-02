const express = require("express");
const routes = express.Router();
const authMiddleware = require("./middlewares/auth");

const userController = require("./controllers/userController");
const taskController = require("./controllers/taskController");

routes.post("/user/register", userController.store);
routes.post("/user/authenticate", userController.auth);
routes.get("/user", authMiddleware, userController.getAll);

routes.get("/task", authMiddleware, taskController.index);

module.exports = routes;
