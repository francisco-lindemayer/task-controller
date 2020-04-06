const auth = require('../middlewares/auth');
const userJoi = require('../validators/user');
const userController = require('../controllers/userController');

module.exports = (routes) => {
  routes.post('/user/authenticate', userJoi.auth, userController.auth);
  routes.post('/user/register', auth, userJoi.store, userController.store);

  routes.get('/user', auth, userController.show);
  routes.get('/user/:id', auth, userJoi.index, userController.index);
  routes.put('/user/:id', auth, userJoi.update, userController.update);
  routes.delete('/user/:id', auth, userJoi.remove, userController.remove);
};
