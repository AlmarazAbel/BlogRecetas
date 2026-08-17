import mongoose from "mongoose";

const recetaSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
      trim: true,
    },

    descripcion: {
      type: String,
      required: true,
      trim: true,
    },

    ingredientes: {
      type: [String],
      required: true,
    },

    preparacion: {
      type: String,
      required: true,
      trim: true,
    },

    tiempoPreparacion: {
      type: Number,
      required: true,
      min: 1,
    },

    dificultad: {
      type: String,
      required: true,
      enum: ["facil", "media", "dificil"],
    },

    imagen: {
      type: String,
      default: "",
    },

    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Receta = mongoose.model("Receta", recetaSchema);
export default Receta;
