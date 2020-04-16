const { celebrate, Joi, Segments } = require('celebrate');

const auth = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string()
      .required()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  }),
});

const store = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(5).required(),
    email: Joi.string().required().email(),
    password: Joi.string()
      .required()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    role: Joi.string().valid('Agente', 'Administrador').required(),
  }),
});

const index = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  }),
});

const update = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(5).required(),
    role: Joi.string().valid('Agente', 'Administrador').required(),
  }),
});

const remove = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required().not(1),
  }),
});

module.exports = { store, auth, index, update, remove };
