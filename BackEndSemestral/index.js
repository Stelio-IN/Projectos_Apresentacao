import express from 'express';
import cors from 'cors';
import routerUser from './routes/userRouter.js';

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
app.use('/api/users', routerUser);
// app.use('/api/reviews', routerReview);

// API de teste
app.get('/', (req, res) => {
    res.json('API DAO SEMESTARL WORK');
});

// Porta
const PORT = process.env.PORT || 3005;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
