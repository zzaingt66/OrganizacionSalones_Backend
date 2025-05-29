const jwt=require('jsonwebtoken');
const User= require('../models/user');

const protect = (rolesPermitidos = []) => {
    return async (req, res, next) => {
      const authHeader = req.headers.authorization;
  
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No autorizado: token faltante' });
      }
  
      try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
        const usuario = await User.findById(decoded.id).select('-password');
        if (!usuario) return res.status(401).json({ message: 'Usuario no encontrado' });
  
        // Verifica rol si se pasó una lista de roles permitidos
        if (rolesPermitidos.length && !rolesPermitidos.includes(usuario.rol)) {
          return res.status(403).json({ message: 'Acceso denegado: rol no permitido' });
        }
  
        req.user = usuario;
        next();
      } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Token inválido o expirado' });
      }
    };
  };
  
  module.exports = { protect };
