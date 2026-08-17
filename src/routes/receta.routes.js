import express from 'express';
import { obtenerRecetas ,obtenerRecetaPorId ,crearReceta} from '../controllers/receta.controller.js';
import verificarToken from '../middlewares/authMiddleware.js';


const router = express.Router();

router.get('/', obtenerRecetas);

router.get('/:id', obtenerRecetaPorId);

router.post('/', verificarToken, crearReceta);

export default router