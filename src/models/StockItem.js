const mongoose = require('mongoose');

const StockItemSchema = new mongoose.Schema({
  vaccine: { type: mongoose.Schema.Types.ObjectId, ref: 'Vaccine', required: true },
  lot: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0 },
  expiryDate: { type: Date, required: true },
}, { 
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
});

module.exports = mongoose.model('StockItem', StockItemSchema);
