const express=require('express');
const dotenv = require('dotenv');
const connectBD= require('./confiig/db');

dotenv.config();
connectDB();

const app=express();
app.use(express.json());

//aqui caragar las rutas
// app.use('/api/salones', require('./routes/salonRoutes'));

app.get ('/', (req,res)=>{
    res.send('API funcionando...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`Servidor en puerto ${PORT}`));