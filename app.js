import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import conectarDB from './src/config/database.js';

dotenv.config();

const app = express();

app.use(cors());
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