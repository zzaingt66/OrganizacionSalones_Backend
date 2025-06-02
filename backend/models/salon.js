const mongoose = require("mongoose");

const inventarioSchema = new mongoose.Schema(
  {
    dispositivos: { type: String, requierd: true, trim: true },
    cantidad: { type: Number, required: true },
  },
  { _id: false }
);

const salonSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    capacidadMaxima: { type: Number, required: true },
    sedeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sede",
      required: true,
    },
    inventario: {
      type: [inventarioSchema],
      required: true,
    },
  },
  { timestamps: true }
);

// middleware para la unicidad del nombre del salon.

salonSchema.pre("save", async function (next) {
  if (this.isModified("nombre" || this.isModified("sedeId") || this.isNew)) {
    const salonExist = await this.constructor.findOne({
      nombre: this.nombre,
      sedeId: this.sedeId,
      _id: { $ne: this._id },
    });
    if (salonExist) {
      return next(
        new Error(
          `Ya existe un salon con el nombre "${this.nombre}" en esta sede`
        )
      );
    }
  }
  next();
});

const Salon = mongoose.model("Salon", salonSchema);
module.exports = Salon;
