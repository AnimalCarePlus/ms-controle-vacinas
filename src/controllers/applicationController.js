const { applyVaccine } = require('../services/stockService');
const { applicationSchema } = require('../validators/applicationValidator');

exports.applyVaccine = async (req, res, next) => {
  try {
   
    const { error, value } = applicationSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(400).json({ success: false, message: 'Erro de validação', details: error.details.map(d => d.message) });

    
    const result = await applyVaccine(value);

    res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};
