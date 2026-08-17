import express from 'express';
import { registrarUsuario ,iniciarSesion } from '../controllers/usuario.controller.js';
import validarUsuario from '../middlewares/validarUsuario.js';

const router = express.Router();

router
.post('/registro', validarUsuario,registrarUsuario);
router
.post('/login', iniciarSesion);

export default router;