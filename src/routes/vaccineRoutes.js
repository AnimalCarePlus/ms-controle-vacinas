const express = require("express");
const router = express.Router();
const controller = require("../controllers/vaccineController");
const { validate } = require("../middlewares/validate");
const { vaccineSchema } = require("../validators/vaccineValidator");

router.get("/", controller.getAllVaccines);
router.post("/", validate(vaccineSchema), controller.createVaccine);
router.get("/:id", controller.getVaccineById);
router.put("/:id", validate(vaccineSchema), controller.updateVaccine);
router.delete("/:id", controller.deleteVaccine);

module.exports = router;
