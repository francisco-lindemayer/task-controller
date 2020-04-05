const auth = require('../middlewares/auth');
const reportController = require('../controllers/reportController');

module.exports = (routes) => {
  routes.get('/report/user/:id', auth, reportController.reportByUser);
  routes.get('/report/department/:id', auth, reportController.reportByDepartment);
};
