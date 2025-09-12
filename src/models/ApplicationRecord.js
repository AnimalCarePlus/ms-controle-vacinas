const mongoose = require('mongoose');

const ApplicationRecordSchema = new mongoose.Schema({
  animalId: { type: String, required: true },
  vaccine: { type: mongoose.Schema.Types.ObjectId, ref: 'Vaccine', required: true },
  lot: { type: String, required: true },
  dose: { type: String },
  appliedBy: { type: String, required: true },
  appliedAt: { type: Date, default: Date.now },
  notes: { type: String },
}, { 
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
});

module.exports = mongoose.model('ApplicationRecord', ApplicationRecordSchema);
