import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import conectarDB from './src/config/database.js';

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev')); // Registrar peticiones en la terminal
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({
        mensaje: 'API Blog de Recetas funcionando'
    });
});

conectarDB();

app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});