const express = require("express");
const routes = express.Router();
const authMiddleware = require("./middlewares/auth");

const userController = require("./controllers/userController");
const departmentController = require("./controllers/departmentController");
const taskController = require("./controllers/taskController");
const reportController = require("./controllers/reportController");

routes.post("/user/authenticate", userController.auth);
routes.post("/user/register", userController.store);

routes.get("/user", authMiddleware, userController.show);
routes.get("/user/:id", authMiddleware, userController.index);
routes.put("/user/:id", authMiddleware, userController.update);
routes.delete("/user/:id", authMiddleware, userController.delete);

routes.get("/department", authMiddleware, departmentController.show);
routes.get("/department/:id", authMiddleware, departmentController.index);
routes.post("/department", authMiddleware, departmentController.store);
routes.put("/department/:id", authMiddleware, departmentController.update);
routes.delete("/department/:id", authMiddleware, departmentController.delete);

routes.get("/task", authMiddleware, taskController.show);
routes.get("/task/:id", authMiddleware, taskController.index);
routes.post("/task", authMiddleware, taskController.store);
routes.put("/task/:id", authMiddleware, taskController.update);
routes.delete("/task/:id", authMiddleware, taskController.delete);
routes.patch("/task/:id", authMiddleware, taskController.changeStatus);

routes.get("/report/user/:id", authMiddleware, reportController.reportByUser);
routes.get(
  "/report/department/:id",
  authMiddleware,
  reportController.reportByDepartment
);

module.exports = routes;
