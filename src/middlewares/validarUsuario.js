const validarUsuario = (req, res, next) => {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
        return res.status(400).json({
            mensaje: 'Nombre, email y password son obligatorios'
        });
    }

    if (nombre.trim().length < 3) {
        return res.status(400).json({
            mensaje: 'El nombre debe tener al menos 3 caracteres'
        });
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValido.test(email)) {
        return res.status(400).json({
            mensaje: 'El email no tiene un formato válido'
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            mensaje: 'La contraseña debe tener al menos 6 caracteres'
        });
    }

    next();
};

export default validarUsuario;