import express from 'express';
import { registrarUsuario } from '../controllers/usuario.controller.js';
import validarUsuario from '../middlewares/validarUsuario.js';

const router = express.Router();

router
.post('/registro', validarUsuario,registrarUsuario);

export default router;