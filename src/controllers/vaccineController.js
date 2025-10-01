const Vaccine = require('../models/Vaccine');
const { vaccineSchema } = require('../validators/vaccineValidator');

exports.getAllVaccines = async (req, res, next) => {
  try {
    const vaccines = await Vaccine.find();
    res.sucess(vaccines);
  } catch (err) {
    next(err);
  }
};

exports.createVaccine = async (req, res, next) => {
  try {
    const { error, value } = vaccineSchema.validate(req.body, { abortEarly: false });
    if (error) return res.error(error.details.map(d => d.message).join(', '), 400);

    const vaccine = await Vaccine.create(value);
    res.sucess(vaccine, 201);
  } catch (err) {
    next(err);
  }
};

exports.getVaccineById = async (req, res, next) => {
  try {
    const vaccine = await Vaccine.findById(req.params.id);
    if (!vaccine) return res.error('Vacina não encontrada', 404);
    res.sucess(vaccine);
  } catch (err) {
    next(err);
  }
};

exports.updateVaccine = async (req, res, next) => {
  try {
    const { error, value } = vaccineSchema.validate(req.body, { abortEarly: false });
    if (error) return res.error(error.details.map(d => d.message).join(', '), 400);

    const vaccine = await Vaccine.findByIdAndUpdate(req.params.id, value, { new: true });
    if (!vaccine) return res.error('Vacina não encontrada', 404);
    res.sucess(vaccine);
  } catch (err) {
    next(err);
  }
};

exports.deleteVaccine = async (req, res, next) => {
  try {
    const vaccine = await Vaccine.findByIdAndDelete(req.params.id);
    if (!vaccine) return res.error('Vacina não encontrada', 404);
    res.sucess({ message: 'Vacina removida' });
  } catch (err) {
    next(err);
  }
};
