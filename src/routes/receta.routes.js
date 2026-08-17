import express from "express";
import {
  obtenerRecetas,
  obtenerRecetaPorId,
  crearReceta,
  actualizarReceta,
  eliminarReceta,
} from "../controllers/receta.controller.js";
import verificarToken from "../middlewares/authMiddleware.js";
import validarReceta from "../middlewares/validarReceta.js";

const router = express.Router();

router.get("/", obtenerRecetas);

router.get("/:id", obtenerRecetaPorId);

router.post("/", verificarToken, validarReceta, crearReceta);

router.put("/:id", verificarToken, validarReceta, actualizarReceta);
router.delete("/:id", verificarToken, eliminarReceta);
export default router;
