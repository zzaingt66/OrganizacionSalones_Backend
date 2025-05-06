const programacionRoutes = require ('./routes/programacionRoutes');
const salonRoutes= require ('./routes/salonRoutes');
const authRoutes = require ('./routes/authRoutes');
const sedeRoutes= require ('./routes/sedeRoutes');
const userRoutes = require ('./routes/userRoutes');


app.use('/api/programaciones', programacionRoutes);
app.use('/api/salones', salonRoutes);
app.use('api/auth', authRoutes);
app.use('api/sedes', sedeRoutes);
app.use('api/usuarios', userRoutes);