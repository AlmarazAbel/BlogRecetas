import Usuario from "../models/usuario.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import enviarCorreo from "../utils/enviarCorreo.js";

export const registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Verificar si el email ya está registrado
    const usuarioExistente = await Usuario.findOne({ email });

    if (usuarioExistente) {
      return res.status(400).json({
        mensaje: "El email ya está registrado",
      });
    }

    // Encriptar contraseña
    const passwordEncriptada = await bcrypt.hash(password, 10);

    // Generar código de 6 dígitos
    const codigoVerificacion = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    // Código válido durante 10 minutos
    const codigoExpiracion = new Date(Date.now() + 10 * 60 * 1000);

    const nuevoUsuario = new Usuario({
      nombre,
      email,
      password: passwordEncriptada,
      emailVerificado: false,
      codigoVerificacion,
      codigoExpiracion,
    });

    await nuevoUsuario.save();

    // Enviar código por email
    await enviarCorreo(email, codigoVerificacion);

    res.status(201).json({
      mensaje: "Usuario registrado. Revisá tu email para verificar la cuenta.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al registrar el usuario",
    });
  }
};
export const verificarEmail = async (req, res) => {
  try {
    const { email, codigo } = req.body;

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado",
      });
    }

    if (usuario.emailVerificado) {
      return res.status(400).json({
        mensaje: "El email ya está verificado",
      });
    }

    if (!usuario.codigoVerificacion || !usuario.codigoExpiracion) {
      return res.status(400).json({
        mensaje: "No existe un código de verificación",
      });
    }

    if (new Date() > usuario.codigoExpiracion) {
      return res.status(400).json({
        mensaje: "El código de verificación ha expirado",
      });
    }

    if (usuario.codigoVerificacion !== codigo) {
      return res.status(400).json({
        mensaje: "El código de verificación es incorrecto",
      });
    }

    usuario.emailVerificado = true;
    usuario.codigoVerificacion = null;
    usuario.codigoExpiracion = null;

    await usuario.save();

    res.json({
      mensaje: "Email verificado correctamente",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al verificar el email",
    });
  }
};
export const iniciarSesion = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(401).json({
        mensaje: "Email o contraseña incorrectos",
      });
    }

    const passwordCorrecta = await bcrypt.compare(password, usuario.password);

    if (!passwordCorrecta) {
      return res.status(401).json({
        mensaje: "Email o contraseña incorrectos",
      });
    }

    if (!usuario.emailVerificado) {
      return res.status(403).json({
        mensaje: "Debés verificar tu email antes de iniciar sesión",
      });
    }
    const token = jwt.sign(
      {
        id: usuario._id,
        email: usuario.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 2 * 60 * 60 * 1000,
    });

    res.json({
      mensaje: "Login correcto",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al iniciar sesión",
    });
  }
};
export const obtenerUsuarioActual = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select("-password");

    if (!usuario) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado",
      });
    }

    res.json(usuario);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al obtener el usuario",
    });
  }
};
export const cerrarSesion = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  res.json({
    mensaje: "Sesión cerrada correctamente",
  });
};
