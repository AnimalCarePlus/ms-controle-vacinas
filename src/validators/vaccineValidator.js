const Joi = require("joi");

const vaccineSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  manufacturer: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(500).optional(),
  dosesRequired: Joi.number().integer().min(1).max(10).required()
});

module.exports = { vaccineSchema };
