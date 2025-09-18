const StockItem = require('../models/StockItem');
const Vaccine = require('../models/Vaccine');
const ApplicationRecord = require('../models/ApplicationRecord');


async function createStockItem({ vaccineId, batchNumber, expirationDate, quantity }) {
  const vaccine = await Vaccine.findById(vaccineId);
  if (!vaccine) throw { status: 400, message: 'Vacina não existe' };

  const stockItem = await StockItem.create({ vaccineId, batchNumber, expirationDate, quantity });
  return stockItem;
}


async function applyVaccine({ animalId, vaccineId, batchNumber, appliedBy, dose, notes }) {
  const item = await StockItem.findOne({ vaccineId, batchNumber });
  if (!item) throw { status: 404, message: 'Lote não encontrado' };
  if (new Date(item.expirationDate) < new Date()) throw { status: 400, message: 'Lote vencido' };
  if (item.quantity <= 0) throw { status: 400, message: 'Estoque insuficiente' };

  item.quantity -= 1;
  await item.save();

  const record = await ApplicationRecord.create({
    animalId,
    vaccine: vaccineId,
    lot: batchNumber,
    dose,
    appliedBy,
    notes
  });

  return { stockItem: item, application: record };
}


async function getLowStock(threshold = 10) {
  const lowStock = await StockItem.aggregate([
    { $group: { _id: '$vaccineId', total: { $sum: '$quantity' } } },
    { $match: { total: { $lte: threshold } } }
  ]);
  return lowStock;
}

async function getNearExpiry(days = 30) {
  const limitDate = new Date();
  limitDate.setDate(limitDate.getDate() + days);
  return await StockItem.find({ expirationDate: { $lte: limitDate } }).populate('vaccineId');
}

module.exports = { createStockItem, applyVaccine, getLowStock, getNearExpiry };
