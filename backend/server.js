const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => {
    console.error("Error al conectar a MongoDB:", err.message);
    process.exit(1);
  });

// Rutas
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const sedeRoutes = require("./routes/sedeRoutes");
const salonRoutes = require("./routes/salonRoutes");
const programacionRoutes = require("./routes/programacionRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/usuarios", userRoutes);
app.use("/api/sedes", sedeRoutes);
app.use("/api/salones", salonRoutes);
app.use("/api/programacion", programacionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
