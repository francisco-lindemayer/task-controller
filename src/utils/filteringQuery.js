const { Op } = require('sequelize');

module.exports = ({ ...params } = {}, { ...validFields } = {}) => {
  const fields = Object.assign({}, params);

  const filter = Object.keys(fields).reduce((accumulator, key) => {
    if (Object.keys(validFields).includes(key)) {
      if (fields[key]) {
        switch (validFields[key]) {
          case Op.substring:
            accumulator[key] = { [Op.substring]: fields[key] };
            break;
          case Op.between:
            accumulator[key] = {
              [Op.between]: [fields[key][0], fields[key][1]],
            };
            break;
          default:
            accumulator[key] = fields[key];
            break;
        }
      }
    }
    return accumulator;
  }, {});

  return filter;
};
