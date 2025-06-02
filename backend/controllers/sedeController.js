const { validationResult, query, param } = require("express-validator");
const Salon = require("../models/salon");
const Sede = require("../models/sede");

// @desc    Crear una nueva sede
// @route   POST /api/sedes
// @access  Private/Admin
const crearSede = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { nombre } = req.body;
  const sedeExists = await Sede.findOne({ nombre });
  if (sedeExists) {
    res.status(400);
    throw new Error("La sede ya existe");
  }
  const sede = await Sede.create({
    nombre,
  });
  if (sede) {
    res.status(201).json(sede);
  } else {
    res.status(400);
    throw new Error("Datos de sede invalidos");
  }
};

// @desc    Obtener todas las sedes
// @route   GET /api/sedes
// @access  Public o Private
const obtenerSedes = async (req, res) => {
  const sedes = await Sede.find({});
  res.json(sedes);
};


// @desc    Crear una nueva sede
// @route   POST /api/sedes
// @access  Private o Public
const obtenerSedeById = async (req, res) => {
  const sede = await Sede.findById(req.params.id);
  if (sede) {
    res.json(sede);
  } else {
    res.status(404);
    throw new Error("No se encontro la sede");
  }
};


// @desc    Crear una nueva sede
// @route   POST /api/sedes
// @access  Private/Admin-SuperAdmin
const deleteSede = async (req, res) => {
  const sede = await Sede.findById(req.params.id);

  if (sede) {
    const tieneSalones = await Salon.countDocuments({ sedeId: req.params.id });
    if (tieneSalones > 0) {
      res.status(400);
      throw new Error("Esta sede tiene salones asociados no se puede borrar");
    }
    await sede.deleteOne();
    res.json({ msg: "sede eliminada" });
  } else {
    res.status(400);
    throw new Error("Ocurrio un error no se pudo borrar");
  }
};

module.exports = { crearSede, obtenerSedes, obtenerSedeById, deleteSede };
