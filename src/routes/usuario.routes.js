import express from "express";
import {
  registrarUsuario,
  iniciarSesion,
  obtenerUsuarioActual,
  cerrarSesion,
  verificarEmail,
  reenviarCodigo,
} from "../controllers/usuario.controller.js";
import validarUsuario from "../middlewares/validarUsuario.js";
import verificarToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/registro", validarUsuario, registrarUsuario);
router.post("/verificar", verificarEmail);
router.post("/reenviar-codigo", reenviarCodigo);
router.post("/login", iniciarSesion);
router.get("/me", verificarToken, obtenerUsuarioActual);
router.post("/logout", cerrarSesion);
export default router;
