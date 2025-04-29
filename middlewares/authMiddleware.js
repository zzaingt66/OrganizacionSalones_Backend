const jwt=require('jsonwebtoken');

const protect= (roles=[])=>{
    return(req,res,next)=>{
        const token =req.headers.authorization?.split('')[1];
        if (!token){
            return res.status(401).json({message:'No autorizado'});
        }
        try {
            const decoded=jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            if(roles.length && !roles.includes(req.user.rol)){
                return res.status(403).json({message:'Acceso denegado'});
            }
            next();
        }catch(error){
            return res.status(401).json({message:'Token invalido'});
    }

  };
};


module.exports={protect};
