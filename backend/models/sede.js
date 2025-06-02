const mongoose = require("mongoose");

const sedeSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      enum: ["Sur", "Norte", "Este"],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
const Sede = mongoose.model("sede", sedeSchema);
module.exports = Sede;
