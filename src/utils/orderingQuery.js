module.exports = ({ ...params } = {}, validFields = []) => {
  const fields = Object.assign({}, params);
  const orderBy = {};

  if (fields.orderBy) {
    validFields.forEach((element) => {
      if (['ASC', 'DESC'].includes(fields.orderBy[element])) {
        orderBy.order = [[element, fields.orderBy[element]]];
        return true;
      }
    });
  }
  return orderBy;
};
