const { Op } = require("sequelize");

module.exports = ({ ...params } = {}, { ...validFields } = {}) => {
  const fields = Object.assign({}, params);

  const filter = Object.keys(fields).reduce((accumulator, key) => {
    if (Object.keys(validFields).includes(key)) {
      if (fields[key]) {
        if (validFields[key] === Op.substring) {
          accumulator[key] = { [Op.substring]: fields[key] };
        } else if (validFields[key] === Op.between) {
          accumulator[key] = { [Op.between]: [fields[key][0], fields[key]][1] };
        } else {
          accumulator[key] = fields[key];
        }
      }
    }
    return accumulator;
  }, {});

  return filter;
};
