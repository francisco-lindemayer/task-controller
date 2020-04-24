const { guard, Admin } = require('../middlewares/guard');
const joi = require('../validators/department');
const controller = require('../controllers/departmentController');

module.exports = (app) => {
  app.get('/department', guard([Admin]), controller.show);
  app.get('/department/:id', guard([Admin]), joi.index, controller.index);
  app.post('/department', guard([Admin]), joi.store, controller.store);
  app.put('/department/:id', guard([Admin]), joi.update, controller.update);
  app.delete('/department/:id', guard([Admin]), joi.remove, controller.remove);
};
