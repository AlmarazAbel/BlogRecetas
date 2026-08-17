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

export const actualizarReceta = async (req, res) => {
    try {
        const { id } = req.params;

        const receta = await Receta.findById(id);

        if (!receta) {
            return res.status(404).json({
                mensaje: 'Receta no encontrada'
            });
        }

        if (receta.usuario.toString() !== req.usuario.id) {
            return res.status(403).json({
                mensaje: 'No tienes permiso para modificar esta receta'
            });
        }

        const recetaActualizada = await Receta.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

       res.status(200).json({
    mensaje: 'Receta actualizada correctamente',
    receta: recetaActualizada
});

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al actualizar la receta'
        });
    }
};

export const eliminarReceta = async (req, res) => {
    try {
        const { id } = req.params;

        const receta = await Receta.findById(id);

        if (!receta) {
            return res.status(404).json({
                mensaje: 'Receta no encontrada'
            });
        }

        if (receta.usuario.toString() !== req.usuario.id) {
            return res.status(403).json({
                mensaje: 'No tienes permiso para eliminar esta receta'
            });
        }

        await Receta.findByIdAndDelete(id);

        res.json({
            mensaje: 'Receta eliminada correctamente'
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al eliminar la receta'
        });
    }
};