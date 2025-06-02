const { body } = require("express-validator");

const RegisterValidatorRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener más de 3 caracteres"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("Debe ingresar una direccion de correo valida"),
  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener más de 6 caracteres"),
  body("role").optional().isIn(["User", "Admin", 'SuperAdmin']).withMessage("Rol invalido"),
];

const LoginValidatorRules = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Debe ingresar su correo")
    .isEmail()
    .withMessage("Ingrese una direccion de correo valida")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("Debe ingresar su contraseña"),
];

module.exports = { LoginValidatorRules, RegisterValidatorRules };
