import express from 'express';
import { registrarUsuario } from '../controllers/usuario.controller.js';

const router = express.Router();

router
.post('/registro', registrarUsuario);

export default router;