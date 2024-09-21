import { PrismaClient } from '@prisma/client';
import express from 'express';
import cors from 'cors';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors());

app.get('/users', async (req, res) => {
    try {
        let lista;

        if (req.query) {
            lista = await prisma.user.findMany({
                where: {
                    name: req.query.name,
                    nascimento: req.query.nascimento,
                    email: req.query.email,
                },
            });
        } else {
            lista = await prisma.user.findMany();
        }

        res.status(200).json(lista);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching users.' });
    }
});

app.post('/users', async (req, res) => {
    try {
        const { name, email, password, nascimento } = req.body;

        // Verifica se todos os campos necessários estão presentes
        if (!name || !email || !password || !nascimento) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // Converte nascimento para um número
        const nascimentoInt = parseInt(nascimento, 10);
        if (isNaN(nascimentoInt)) {
            return res.status(400).json({ error: 'Nascimento must be a number.' });
        }

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
                nascimento: nascimentoInt, // Use o valor convertido
            },
        });

        res.status(201).json(user); // Retorna o usuário criado
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the user.' });
    }
});


app.put('/users/:id', async (req, res) => {
    try {
        const { name, email, password, nascimento } = req.body;

        const user = await prisma.user.update({
            where: {
                id: Number(req.params.id), // Certifique-se de que o ID é um número
            },
            data: {
                name,
                email,
                password,
                nascimento,
            },
        });

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the user.' });
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await prisma.user.delete({
            where: {
                id: userId,
            },
        });

        res.status(200).json(`Usuário ${deletedUser.id} deletado`);
    } catch (error) {
        if (error.code === 'P2025') { // Código de erro para "Registro não encontrado"
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        console.error(error);
        res.status(500).json({ error: 'An error occurred while deleting the user.' });
    }
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
