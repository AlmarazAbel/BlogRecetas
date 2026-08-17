import  jwt from "jsonwebtoken";

const verificarToken = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        mensaje: "No se proporcionó un token",
      });
    }

    const usuario = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.usuario = usuario;

    next();

  } catch (error) {
    return res.status(401).json({
      mensaje: "Token inválido o expirado",
    });
  }
};

export default verificarToken;