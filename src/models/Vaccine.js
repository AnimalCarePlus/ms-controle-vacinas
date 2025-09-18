const mongoose = require('mongoose');

const VaccineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String }, // opcional
  dosesRequired: { type: Number, required: true, min: 1, max: 10 }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

module.exports = mongoose.model('Vaccine', VaccineSchema);
