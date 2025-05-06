const express = require ('express');
const router = express.Router();

const { loginUsuario} = require ('../controllers/authController');

//login
router.post('/login', loginUsuario);

module.exports = router;
