const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const {
  LoginValidatorRules,
  RegisterValidatorRules,
} = require("../validators/auth.validator");

router.post("/login", LoginValidatorRules, loginUser);
router.post("/register", RegisterValidatorRules, registerUser);
router.get("/me", protect, getMe);

module.exports = router;
