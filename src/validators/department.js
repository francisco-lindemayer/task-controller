const { celebrate, Joi, Segments } = require('celebrate');

const store = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().alphanum().min(5).max(30).required(),
  }),
});

const index = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  }),
});

const update = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().alphanum().min(5).max(30).required(),
  }),
});

const remove = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  }),
});

module.exports = { store, index, update, remove };
