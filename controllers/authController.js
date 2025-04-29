const User = require ('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginUsuario = async (req, res)=>{
    const {email, password}= req.body;

    const usuario= await User.findOne({email});
    if (!usuario) return res.status(401).json({message: 'credenciales invalidas'});

    const valido= await bcrypt.compare(password, usuario.password);
    if (!valido) return res.status(401).json({message: 'credenciales invalidas'});

    const token =jwt.sign (
        { id:usuario._id, rol: usuario.rol},
        process.env.JWT_SECRET,
        {expiresIn: '1d'}
    );

    res.json({
        token,
        usuario:{
            id:usuario._id,
            nombre: usuario.nombre,
            rol: usuario.rol
        }
    });
};

module.exports ={loginUsuario};
