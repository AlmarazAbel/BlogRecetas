const validarReceta = (req, res, next) => {
  const {
    titulo,
    descripcion,
    ingredientes,
    preparacion,
    tiempoPreparacion,
    dificultad,
  } = req.body;

  if (
    !titulo ||
    !descripcion ||
    !ingredientes ||
    !preparacion ||
    !tiempoPreparacion ||
    !dificultad
  ) {
    return res.status(400).json({
      mensaje: "Todos los campos obligatorios deben estar completos",
    });
  }

  if (titulo.trim().length < 3) {
    return res.status(400).json({
      mensaje: "El título debe tener al menos 3 caracteres",
    });
  }

  if (!Array.isArray(ingredientes) || ingredientes.length === 0) {
    return res.status(400).json({
      mensaje: "Debe proporcionar al menos un ingrediente",
    });
  }

  if (tiempoPreparacion <= 0) {
    return res.status(400).json({
      mensaje: "El tiempo de preparación debe ser mayor a 0",
    });
  }

  const dificultadesValidas = ["facil", "media", "dificil"];

  if (!dificultadesValidas.includes(dificultad)) {
    return res.status(400).json({
      mensaje: "La dificultad debe ser facil, media o dificil",
    });
  }

  next();
};

export default validarReceta;
