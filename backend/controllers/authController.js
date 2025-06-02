const User = require("../models/user");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const { validationResult } = require("express-validator");

//@desc Registrar usuario
//@route POST /api/auth/register
//@access Public

const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("El usuario ya existe");
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } else {
    res.status(400);
    throw new Error("Datos invalidos");
  }
};

// @desc    Inicio de sesion para el usuario
// @route   POST /api/auth/login
// @access  Public

const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  const usuario = await User.findOne({ email });
  valido = await bcrypt.compare(password, usuario.password);
  if (usuario && valido) {
    res.json({
      _id: usuario._id,
      name: usuario.name,
      email: usuario.email,
      role: usuario.role,
      token: generateToken(usuario._id, usuario.role),
    });
  } else {
    res.status(401);
    throw new Error("Credenciales invalidas");
  }
};

// @desc    Obtener perfil del usuario loguedo
// @route   POST /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(404);
    throw new Error("Usuario no encontrado");
  }
};

module.exports = { loginUser, registerUser, getMe };
