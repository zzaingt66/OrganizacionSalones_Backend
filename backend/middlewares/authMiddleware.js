const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);

      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) {
        res.status(401);
        throw new Error("No autorizado");
      }
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("No autorizado, el token fallo o expiro");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("no autorizado, no se proporciono un token");
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      res.status(401);
      throw new Error("No autorizado, se require iniciar sesion");
    }
    console.log(roles);
    if (!roles.includes(req.user.role)) {
      res.status(403);
      throw new Error("Acceso denegado");
    }
    next();
  };
};

module.exports = { protect, authorize };
