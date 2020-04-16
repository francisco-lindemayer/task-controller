const auth = require('../middlewares/auth');
const taskJoi = require('../validators/task');
const taskController = require('../controllers/taskController');

module.exports = (routes) => {
  routes.get('/task', auth, taskController.show);
  routes.get('/task/:id', auth, taskJoi.index, taskController.index);
  routes.post('/task', auth, taskJoi.store, taskController.store);
  routes.put('/task/:id', auth, taskJoi.update, taskController.update);
  routes.delete('/task/:id', auth, taskJoi.remove, taskController.remove);
  routes.patch('/task/:id', auth, taskJoi.changeStatus, taskController.changeStatus);
};
