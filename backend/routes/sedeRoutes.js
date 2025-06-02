const express = require("express");
const router = express.Router();

const {
  crearSede,
  obtenerSedes,
  obtenerSedeById,
  deleteSede,
} = require("../controllers/sedeController");
const { protect, authorize } = require("../middlewares/authMiddleware");
const SedeValidatorRules = require("../validators/sedes.validator");

router
  .route("/")
  .get(protect, obtenerSedes)
  .post(protect, authorize("Admin", "SuperAdmin"), SedeValidatorRules, crearSede);

router
  .route("/:id")
  .get(protect, obtenerSedeById)
  .delete(protect, authorize("Admin", "SuperAdmin"), deleteSede);

module.exports = router;
