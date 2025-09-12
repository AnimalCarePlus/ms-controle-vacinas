const { applyVaccine } = require('../services/stockService');

exports.applyVaccine = async (req,res,next)=>{
  try{ res.status(201).json(await applyVaccine(req.body)); }
  catch(err){ next(err); }
};
