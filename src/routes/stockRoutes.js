const express = require("express");
const router = express.Router();
const controller = require("../controllers/stockController");
const { validate } = require("../middlewares/validate");
const { stockSchema } = require("../validators/stockValidator");

router.get("/", controller.getAllStock);
router.post("/", validate(stockSchema), controller.createStock);
router.put("/:id", validate(stockSchema), controller.updateStock);
router.delete("/:id", controller.deleteStock);

router.get("/alerts/low-stock", controller.getLowStockAlerts);
router.get("/alerts/near-expiry", controller.getNearExpiryAlerts);

module.exports = router;
