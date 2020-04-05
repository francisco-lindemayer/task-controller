module.exports = {
  secret: process.env.JWT_SECRET,
  expiresIn: parseInt(process.env.JWT_EXPIRES),
};
