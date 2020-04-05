const { celebrate, Joi, Segments } = require('celebrate');

const store = celebrate({
  [Segments.BODY]: Joi.object().keys({
    description: Joi.string().required(),
    user_id: Joi.number(),
    department_id: Joi.number(),
  }),
});

const index = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  }),
});

const update = celebrate({
  [Segments.BODY]: Joi.object().keys({
    description: Joi.string().required(),
    user_id: Joi.number(),
    department_id: Joi.number(),
  }),
});

const changeStatus = celebrate({
  [Segments.BODY]: Joi.object().keys({
    action: Joi.string().valid('tostart', 'tocomplete').required(),
  }),
});

const remove = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  }),
});

module.exports = { store, index, update, remove, changeStatus };
