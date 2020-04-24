const { guard, Admin, Analyzer, User } = require('../middlewares/guard');
const joi = require('../validators/user');
const controller = require('../controllers/userController');

module.exports = (app) => {
  app.post('/user/authenticate', joi.auth, controller.auth);
  app.post('/user/register', guard([Admin]), joi.store, controller.store);

  app.get('/user', guard([Admin, Analyzer]), controller.show);
  app.get('/user/:id', guard([Admin, Analyzer, User]), joi.index, controller.index);
  app.put('/user/:id', guard([Admin, Analyzer]), joi.update, controller.update);
  app.delete('/user/:id', guard([Admin, Analyzer]), joi.remove, controller.remove);
};
