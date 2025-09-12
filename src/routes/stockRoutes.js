const express = require('express');
const router = express.Router();
const controller = require('../controllers/stockController');

router.get('/', controller.getAllStock);
router.post('/', controller.createStock);
router.put('/:id', controller.updateStock);
router.delete('/:id', controller.deleteStock);

router.get('/alerts/low-stock', controller.getLowStockAlerts);
router.get('/alerts/near-expiry', controller.getNearExpiryAlerts);

module.exports = router;
