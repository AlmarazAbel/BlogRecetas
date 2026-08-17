import express from "express";
import cors from "cors";
import morgan from "morgan";
import conectarDB from "./src/config/database.js";
import usuarioRoutes from "./src/routes/usuario.routes.js";
import recetaRoutes from "./src/routes/receta.routes.js";
import cookieParser from "cookie-parser";

const app = express();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(morgan("dev")); // Registrar peticiones en la terminal
app.use(express.json());
app.use(cookieParser());
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/recetas", recetaRoutes);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    mensaje: "API Blog de Recetas funcionando",
  });
});

conectarDB();

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
