const Vaccine = require('../models/Vaccine');

exports.getAllVaccines = async (req, res, next) => {
  try { res.json(await Vaccine.find()); } 
  catch (err) { next(err); }
};

exports.createVaccine = async (req, res, next) => {
  try { res.status(201).json(await Vaccine.create(req.body)); } 
  catch (err) { next(err); }
};

exports.getVaccineById = async (req, res, next) => {
  try {
    const v = await Vaccine.findById(req.params.id);
    if(!v) return res.status(404).json({error:'Vacina não encontrada'});
    res.json(v);
  } catch(err){ next(err); }
};

exports.updateVaccine = async (req,res,next)=>{
  try{
    const v = await Vaccine.findByIdAndUpdate(req.params.id, req.body, {new:true});
    if(!v) return res.status(404).json({error:'Vacina não encontrada'});
    res.json(v);
  } catch(err){ next(err); }
};

exports.deleteVaccine = async (req,res,next)=>{
  try{
    const v = await Vaccine.findByIdAndDelete(req.params.id);
    if(!v) return res.status(404).json({error:'Vacina não encontrada'});
    res.json({message:'Vacina removida'});
  } catch(err){ next(err); }
};
