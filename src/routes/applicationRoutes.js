const express = require("express");
const router = express.Router();
const controller = require("../controllers/applicationController");
const { validate } = require("../middlewares/validate");
const { applicationSchema } = require("../validators/applicationValidator");

router.post("/apply", validate(applicationSchema), controller.applyVaccine);

module.exports = router;
