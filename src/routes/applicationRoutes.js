const express = require('express');
const router = express.Router();
const controller = require('../controllers/applicationController');

router.post('/apply', controller.applyVaccine);

module.exports = router;
