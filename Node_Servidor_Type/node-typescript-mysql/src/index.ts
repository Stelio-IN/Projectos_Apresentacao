// src/index.ts

import express, { Request, Response } from 'express';
import mysql from 'mysql2/promise'; // Utilize a versão com Promise

const app = express();
const port = 3000;

app.use(express.json());

// Configuração da conexão com o MySQL
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',       // Substitua pelo seu usuário do MySQL
  password: '', // Substitua pela sua senha do MySQL
  database: 'testdb',   // Substitua pelo nome do seu banco de dados
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// CRUD Endpoints

// Criar um novo usuário
app.post('/users', async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
  
  try {
    const [result] = await db.execute<mysql.ResultSetHeader>(query, [name, email]);
    res.status(201).send(`Usuário adicionado com ID: ${result.insertId}`);
  } catch (err) {
    console.error('Erro ao inserir usuário:', err);
    res.status(500).send('Erro ao inserir usuário');
  }
});

// Obter todos os usuários
app.get('/users', async (req: Request, res: Response) => {
  const query = 'SELECT * FROM users';
  
  try {
    const [results] = await db.query<mysql.RowDataPacket[]>(query);
    res.json(results);
  } catch (err) {
    console.error('Erro ao buscar usuários:', err);
    res.status(500).send('Erro ao buscar usuários');
  }
});

// Obter um usuário específico pelo ID
app.get('/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const query = 'SELECT * FROM users WHERE id = ?';
  
  try {
    const [results] = await db.query<mysql.RowDataPacket[]>(query, [id]);
    if (results.length === 0) {
      res.status(404).send('Usuário não encontrado');
    } else {
      res.json(results[0]);
    }
  } catch (err) {
    console.error('Erro ao buscar usuário:', err);
    res.status(500).send('Erro ao buscar usuário');
  }
});

// Atualizar um usuário pelo ID
app.put('/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
  
  try {
    const [result] = await db.execute<mysql.ResultSetHeader>(query, [name, email, id]);
    if (result.affectedRows === 0) {
      res.status(404).send('Usuário não encontrado');
    } else {
      res.send('Usuário atualizado com sucesso');
    }
  } catch (err) {
    console.error('Erro ao atualizar usuário:', err);
    res.status(500).send('Erro ao atualizar usuário');
  }
});

// Deletar um usuário pelo ID
app.delete('/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const query = 'DELETE FROM users WHERE id = ?';
  
  try {
    const [result] = await db.execute<mysql.ResultSetHeader>(query, [id]);
    if (result.affectedRows === 0) {
      res.status(404).send('Usuário não encontrado');
    } else {
      res.send('Usuário deletado com sucesso');
    }
  } catch (err) {
    console.error('Erro ao deletar usuário:', err);
    res.status(500).send('Erro ao deletar usuário');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
