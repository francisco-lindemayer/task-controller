const auth = require('../middlewares/auth');
const departmentJoi = require('../validators/department');
const departmentController = require('../controllers/departmentController');

module.exports = (routes) => {
  routes.get('/department', auth, departmentController.show);
  routes.get('/department/:id', auth, departmentJoi.index, departmentController.index);
  routes.post('/department', auth, departmentJoi.store, departmentController.store);
  routes.put('/department/:id', auth, departmentJoi.update, departmentController.update);
  routes.delete('/department/:id', auth, departmentJoi.remove, departmentController.remove);
};
