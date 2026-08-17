import express from 'express';
import { obtenerRecetas ,obtenerRecetaPorId ,crearReceta} from '../controllers/receta.controller.js';
import verificarToken  from '../middlewares/authMiddleware.js';
import validarReceta from '../middlewares/validarReceta.js';


const router = express.Router();

router.get('/', obtenerRecetas);

router.get('/:id', obtenerRecetaPorId);

router.post('/', verificarToken,validarReceta, crearReceta);

export default router