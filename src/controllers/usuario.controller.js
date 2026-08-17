import Usuario from "../models/usuario.model.js";
import bcrypt from "bcryptjs";
import  jwt from "jsonwebtoken";

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
export const iniciarSesion = async (req, res) => {
    try {
        const { email, password } = req.body;

        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(401).json({
                mensaje: 'Email o contraseña incorrectos'
            });
        }

        const passwordCorrecta = await bcrypt.compare(
            password,
            usuario.password
        );

        if (!passwordCorrecta) {
            return res.status(401).json({
                mensaje: 'Email o contraseña incorrectos'
            });
        }

        const token = jwt.sign(
            {
                id: usuario._id,
                email: usuario.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '2h'
            }
        );

        res.json({
            mensaje: 'Login correcto',
            token
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al iniciar sesión'
        });
    }
};