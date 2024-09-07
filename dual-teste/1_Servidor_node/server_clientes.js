const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configuração do middleware
app.use(cors());
app.use(bodyParser.json());

// Configuração da conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'testdb'
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados MySQL');
  }
});

// Rota para listar todos os dados
app.get('/clientes/dados', (req, res) => {
  const sql = 'SELECT * FROM clientes';
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

// Rota para cadastrar um novo dado
app.post('/clientes/dados', (req, res) => {
  const { nome, email, password } = req.body;
  const sql = 'INSERT INTO clientes (nome, email, password) VALUES (?, ?, ?)';
  db.query(sql, [nome, email, password], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ id: result.insertId, nome, email, password });
    }
  });
});

// Rota para atualizar um dado existente
app.put('/clientes/:id', (req, res) => {
  const { id } = req.params;
  const { nome, email, password } = req.body;
  const sql = 'UPDATE clientes SET nome = ?, email = ?, password = ? WHERE id = ?';
  db.query(sql, [nome, email, password, id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ id, nome, email, password });
    }
  });
});

// Rota para eliminar um dado
app.delete('/clientes/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM clientes WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Dado não encontrado' });
    } else {
      res.json({ message: 'Dado eliminado com sucesso' });
    }
  });
});

// Rota para login
app.get('/clientes/login/:email/:password', (req, res) => {
  const { email, password } = req.params;
  const sql = 'SELECT * FROM clientes WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (results.length > 0) {
      res.json({ message: 'Login bem-sucedido', user: results[0] });
    } else {
      res.status(401).json({ error: 'Credenciais inválidas' });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
