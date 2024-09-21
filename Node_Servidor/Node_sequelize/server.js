import express from 'express';
import cors from 'cors';
import router from './routes/productRouter.js';

const app = express();

// Opções de CORS
const corsOptions = {
    origin: '*', // Permite requisições da porta 8081
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
};

// Middleware
app.use(cors(corsOptions)); // Usar CORS com opções
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/products', router);

// API de teste
app.get('/', (req, res) => {
    res.json('Hello from api');
});

// Porta
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
