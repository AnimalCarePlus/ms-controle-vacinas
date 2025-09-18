const Joi = require("joi");

const stockSchema = Joi.object({
  vaccineId: Joi.string().hex().length(24).required(), 
  quantity: Joi.number().integer().min(0).required(),
  batchNumber: Joi.string().min(3).max(30).required(),
  expirationDate: Joi.date().iso().greater("now").required(), 
});

module.exports = { stockSchema };
