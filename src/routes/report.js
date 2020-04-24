const { guard, Admin } = require('../middlewares/guard');
const controller = require('../controllers/reportController');

module.exports = (app) => {
  app.get('/report/user/:id', guard([Admin]), controller.reportByUser);
  app.get('/report/department/:id', guard([Admin]), controller.reportByDepartment);
};
