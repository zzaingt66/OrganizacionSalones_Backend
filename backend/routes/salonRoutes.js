const express = require ('express');
const router = express.Router();

const {crearSalon, obtenerSalones}= require ('../controllers/salonController');
const {protect} = require ('../middlewares/authMiddleware');

//rutas de gestion salones

router.post('/', protect, crearSalon);
router.get('/', protect, obtenerSalones);

module.exports = router;
