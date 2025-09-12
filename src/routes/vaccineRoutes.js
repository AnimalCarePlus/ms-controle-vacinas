const express = require('express');
const router = express.Router();
const controller = require('../controllers/vaccineController');

router.get('/', controller.getAllVaccines);
router.post('/', controller.createVaccine);
router.get('/:id', controller.getVaccineById);
router.put('/:id', controller.updateVaccine);
router.delete('/:id', controller.deleteVaccine);

module.exports = router;
