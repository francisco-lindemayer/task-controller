module.exports = function authException(message, status) {
  this.error = message;
  this.status = status;
};
