const Vaccine = require('../models/Vaccine');
const { vaccineSchema } = require('../validators/vaccineValidator');

exports.getAllVaccines = async (req, res, next) => {
  try { 
    const vaccines = await Vaccine.find();
    res.json(vaccines); 
  } catch (err) { 
    next(err); 
  }
};

exports.createVaccine = async (req, res, next) => {
  try { 
    const { error, value } = vaccineSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: "Erro de validação",
        details: error.details.map(d => d.message)
      });
    }

    const vaccine = await Vaccine.create(value);
    res.status(201).json(vaccine); 
  } catch (err) { 
    next(err); 
  }
};


exports.getVaccineById = async (req, res, next) => {
  try {
    const vaccine = await Vaccine.findById(req.params.id);
    if (!vaccine) return res.status(404).json({ error: 'Vacina não encontrada' });
    res.json(vaccine);
  } catch (err) {
    next(err);
  }
};


exports.updateVaccine = async (req, res, next) => {
  try {
    const { error, value } = vaccineSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: "Erro de validação",
        details: error.details.map(d => d.message)
      });
    }

    const vaccine = await Vaccine.findByIdAndUpdate(req.params.id, value, { new: true });
    if (!vaccine) return res.status(404).json({ error: 'Vacina não encontrada' });
    res.json(vaccine);
  } catch (err) {
    next(err);
  }
};


exports.deleteVaccine = async (req, res, next) => {
  try {
    const vaccine = await Vaccine.findByIdAndDelete(req.params.id);
    if (!vaccine) return res.status(404).json({ error: 'Vacina não encontrada' });
    res.json({ message: 'Vacina removida' });
  } catch (err) {
    next(err);
  }
};
