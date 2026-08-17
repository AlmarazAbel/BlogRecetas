import Usuario from "../models/usuario.model.js";
import bcrypt from "bcryptjs";


export const registrarUsuario = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        const passwordEncriptada = await bcrypt.hash(password, 10);

        const nuevoUsuario = new Usuario({
            nombre,
            email,
            password: passwordEncriptada
        });

        await nuevoUsuario.save();

        res.status(201).json({
            mensaje: 'Usuario registrado correctamente',
            usuario: {
                nombre: nuevoUsuario.nombre,
                email: nuevoUsuario.email
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al registrar el usuario'
        });
    }
};