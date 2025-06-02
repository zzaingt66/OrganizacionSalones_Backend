const express = require("express");
const router = express.Router();

const {
  crearUsuario,
  obtenerUsuarios,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/", protect, crearUsuario);
router.get("/", protect, obtenerUsuarios);

module.exports = router;
