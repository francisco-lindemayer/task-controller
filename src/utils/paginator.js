module.exports = ({ page = 1, pageSize = 30 } = {}) => {
  const offset = (page - 1) * pageSize;
  const limit = pageSize;

  return { offset, limit };
};
