const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const User = require('../models/User');
const ErrorHandler = require('../middlewares/errorHandler');

const getAuthHeader = (headers) => {
  try {
    const authorization = headers.authorization;
    if (!authorization) {
      throw new ErrorHandler('No token provided', 401);
    }

    const parts = authorization.split(' ');

    if (!parts.length === 2) {
      throw new ErrorHandler('Token error', 401);
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      throw new ErrorHandler('Token invalid format', 401);
    }

    return token;
  } catch (err) {
    if (err instanceof ErrorHandler) {
      throw err;
    }
    throw new ErrorHandler('Get headers failed', 500);
  }
};

const checkRole = async (userId, role) => {
  try {
    const user = await User.findOne({
      where: { id: userId },
    });

    if (!role.includes(user.role)) {
      throw new ErrorHandler('Access denied.', 401);
    }

    return user;
  } catch (err) {
    if (err instanceof ErrorHandler) {
      throw err;
    }
    throw new ErrorHandler('Check role failed', 500);
  }
};

module.exports = {
  async auth(headers, role = []) {
    try {
      const token = getAuthHeader(headers);
      const userId = jwt.verify(token, authConfig.secret, (error, decoded) => {
        if (error) {
          throw new ErrorHandler('Token invalid', 401);
        }
        return decoded.id;
      });

      await checkRole(userId, role);

      return userId;
    } catch (err) {
      if (err instanceof ErrorHandler) {
        throw err;
      }
      throw new ErrorHandler('Authenticate failed', 500);
    }
  },
};
