const Joi = require("joi");

const applicationSchema = Joi.object({
  animalId: Joi.string().hex().length(24).required(),
  vaccineId: Joi.string().hex().length(24).required(),
  batchNumber: Joi.string().min(1).max(30).required(),
  dose: Joi.string().min(1).max(50).optional(),
  appliedBy: Joi.string().min(3).max(100).required(),
  notes: Joi.string().max(500).optional(),
});

module.exports = { applicationSchema };
