module.exports = ({ ...params } = {}, [...validFields] = []) => {
  const fields = Object.assign({}, params);

  const filter = Object.keys(fields).reduce((accumulator, key) => {
    if (validFields.includes(key)) {
      accumulator[key] = fields[key];
    }
    return accumulator;
  }, {});

  return filter;
};
