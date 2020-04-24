const { guard, Admin, Analyzer, User } = require('../middlewares/guard');
const joi = require('../validators/task');
const controller = require('../controllers/taskController');

module.exports = (app) => {
  app.get('/task', guard([Admin, Analyzer, User]), controller.show);
  app.get('/task/:id', guard([Admin, Analyzer, User]), joi.index, controller.index);
  app.post('/task', guard([Admin, Analyzer, User]), joi.store, controller.store);
  app.put('/task/:id', guard([Admin, Analyzer, User]), joi.update, controller.update);
  app.delete('/task/:id', guard([Admin, Analyzer, User]), joi.remove, controller.remove);
  app.patch('/task/:id', guard([Admin, Analyzer, User]), joi.changeStatus, controller.changeStatus);
};
