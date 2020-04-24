const { auth } = require('./auth');
const { Admin, Analyzer, User } = require('../utils/slugRole');

const guard = (slugRoles = []) => {
  return async (request, response, next) => {
    try {
      const userId = await auth(request.headers, slugRoles);

      request.userId = userId;

      next();
    } catch (err) {
      const { error, status } = err;

      if (status) {
        return response.status(status).json(error);
      } else {
        return response.status(500).json('Authenticate failed');
      }
    }
  };
};

module.exports = { Admin, Analyzer, User, guard };
