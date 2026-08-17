import Receta from '../models/receta.model.js';

// Obtener todas las recetas
export const obtenerRecetas = async (req, res) => {
    try {
        const recetas = await Receta.find()
            .populate('usuario', 'nombre email');

        res.json(recetas);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al obtener las recetas'
        });
    }
};


// Obtener una receta por ID
export const obtenerRecetaPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const receta = await Receta.findById(id)
            .populate('usuario', 'nombre email');

        if (!receta) {
            return res.status(404).json({
                mensaje: 'Receta no encontrada'
            });
        }

        res.json(receta);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al obtener la receta'
        });
    }
};

export const crearReceta = async (req, res) => {
    try {
        const {
            titulo,
            descripcion,
            ingredientes,
            preparacion,
            tiempoPreparacion,
            dificultad,
            imagen
        } = req.body;

        const nuevaReceta = new Receta({
            titulo,
            descripcion,
            ingredientes,
            preparacion,
            tiempoPreparacion,
            dificultad,
            imagen,
            usuario: req.usuario.id
        });

        await nuevaReceta.save();

        res.status(201).json({
            mensaje: 'Receta creada correctamente',
            receta: nuevaReceta
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al crear la receta'
        });
    }
};