const Sede = require('../models/sede');

const crearSede = async (req, res) => {
    const { nombre } = req.body;
  
    const existente = await Sede.findOne({ nombre });
    if (existente) return res.status(400).json({ message: 'La sede ya existe' });
  
    const sede = new Sede({ nombre });
    const guardada = await sede.save();
    res.status(201).json(guardada);
  };
  
  const obtenerSedes = async (req, res) => {
    const sedes = await Sede.find();
    res.json(sedes);
  };
  
  module.exports = { crearSede, obtenerSedes };