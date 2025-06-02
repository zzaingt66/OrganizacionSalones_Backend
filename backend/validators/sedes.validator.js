const { body } = require("express-validator");

const SedeValidatorRules = [
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("Debe tener un nombre asignado.")
    .isIn(["Sur", "Norte", "Este"])
    .withMessage("Sede invalida"),
];

module.exports = SedeValidatorRules;
