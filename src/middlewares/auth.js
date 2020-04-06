const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const User = require('../models/User');
const Roles = require('./role');

module.exports = async (request, response, next) => {
  const authHeaders = request.headers.authorization;

  if (!authHeaders) {
    return response.status(401).send({ error: 'No token provided' });
  }

  const parts = authHeaders.split(' ');

  if (!parts.length == 2) {
    return response.status(401).send({ error: 'Token error' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return response.status(401).send({ error: 'Token invalid format' });
  }

  jwt.verify(token, authConfig.secret, (error, decoded) => {
    if (error) {
      return response.status(401).send({ error: 'Token invalid' });
    }
    request.userId = decoded.id;
  });

  if (
    ['/user/register', '/user', '/user/:id', '/department', '/department/:id'].includes(
      request.route.path,
    )
  ) {
    let user = await User.findOne({ where: { id: request.userId, role: Roles.Admin } });

    if (!user) {
      return response.status(401).json({ error: 'Dont permission to acess this resouce.' });
    }
  }

  return next();
};
