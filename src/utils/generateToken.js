const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

module.exports = function generateToken(params = {}) {
  return (token = jwt.sign(params, authConfig.secret, {
    expiresIn: authConfig.expiresIn
  }));
};
