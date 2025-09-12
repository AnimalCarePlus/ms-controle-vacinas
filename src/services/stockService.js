const StockItem = require('../models/StockItem');
const ApplicationRecord = require('../models/ApplicationRecord');

async function applyVaccine({ animalId, vaccineId, lot, appliedBy, dose, notes }) {
  const item = await StockItem.findOne({ vaccine: vaccineId, lot });
  if (!item) throw { status: 404, message: 'Lote não encontrado' };
  if (new Date(item.expiryDate) < new Date()) throw { status: 400, message: 'Lote vencido' };
  if (item.quantity <= 0) throw { status: 400, message: 'Estoque insuficiente' };

  item.quantity -= 1;
  await item.save();

  const record = await ApplicationRecord.create({
    animalId,
    vaccine: vaccineId,
    lot,
    dose,
    appliedBy,
    notes
  });

  return { stockItem: item, application: record };
}

async function getLowStock(threshold = 10) {
  const lowStock = await StockItem.aggregate([
    { $group: { _id: '$vaccine', total: { $sum: '$quantity' } } },
    { $match: { total: { $lte: threshold } } }
  ]);
  return lowStock;
}

async function getNearExpiry(days = 30) {
  const limitDate = new Date();
  limitDate.setDate(limitDate.getDate() + days);
  return await StockItem.find({ expiryDate: { $lte: limitDate } }).populate('vaccine');
}

module.exports = { applyVaccine, getLowStock, getNearExpiry };
