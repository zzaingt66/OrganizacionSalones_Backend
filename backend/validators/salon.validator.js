const { body } = require("express-validator");

exports.createSalonValidatorRules = [body("nombre").trim];
