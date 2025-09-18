const mongoose = require("mongoose");

const stockItemSchema = new mongoose.Schema({
  vaccineId: {       
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vaccine",
    required: true,
  },
  batchNumber: {      
    type: String,
    required: true,
  },
  expirationDate: {   
    type: Date,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model("StockItem", stockItemSchema);
