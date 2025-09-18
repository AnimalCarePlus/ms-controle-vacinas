const { createStockItem, getLowStock, getNearExpiry } = require('../services/stockService');
const StockItem = require('../models/StockItem');


exports.createStock = async (req, res, next) => {
  try {
    const stock = await createStockItem(req.body);
    res.status(201).json(stock);
  } catch (err) {
    next(err);
  }
};


exports.getAllStock = async (req,res,next)=>{
  try{ res.json(await StockItem.find().populate('vaccineId')); }
  catch(err){ next(err); }
};

exports.updateStock = async (req,res,next)=>{
  try{
    const s = await StockItem.findByIdAndUpdate(req.params.id, req.body, {new:true});
    if(!s) return res.status(404).json({error:'Item não encontrado'});
    res.json(s);
  } catch(err){ next(err); }
};

exports.deleteStock = async (req,res,next)=>{
  try{
    const s = await StockItem.findByIdAndDelete(req.params.id);
    if(!s) return res.status(404).json({error:'Item não encontrado'});
    res.json({message:'Item removido'});
  } catch(err){ next(err); }
};

exports.getLowStockAlerts = async (req,res,next)=>{
  try{
    const threshold = parseInt(req.query.threshold)||10;
    res.json(await getLowStock(threshold));
  } catch(err){ next(err); }
};

exports.getNearExpiryAlerts = async (req,res,next)=>{
  try{
    const days = parseInt(req.query.days)||30;
    res.json(await getNearExpiry(days));
  } catch(err){ next(err); }
};
