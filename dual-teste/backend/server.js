const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware para parsear o corpo das requisições
app.use(bodyParser.json());

// Configuração da conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Altere para a senha do seu MySQL
  database: 'clientesdb'
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conectado ao MySQL');
});

// Rotas
app.get('/', (req, res) => {
    res.send('Servidor está funcionando!');
  });
  

  app.get('/search', (req, res) => {
    // Obtendo query parameters
    const { name, age } = req.query;
    
    // Resposta com os parâmetros recebidos
    res.send(`Name: ${name}, Age: ${age}`);
  });
  

// Cadastro de Usuário
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword],
      (err, results) => {
        if (err) {
          res.status(500).send('Erro ao cadastrar usuário');
          return;
        }
        res.status(201).send('Usuário cadastrado com sucesso');
      }
    );
  } catch (err) {
    res.status(500).send('Erro ao cadastrar usuário');
  }
});

// Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    async (err, results) => {
      if (err) {
        res.status(500).send('Erro ao fazer login');
        return;
      }
      if (results.length === 0) {
        res.status(400).send('Usuário não encontrado');
        return;
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).send('Senha incorreta');
        return;
      }

      const token = jwt.sign({ id: user.id }, 'secrectKey', { expiresIn: '1h' });
      res.json({ token });
    }
  );
});

// Atualização de Dados
app.post('/update', (req, res) => {
  const { token, name, email } = req.body;
  if (!token) return res.status(401).send('Token não fornecido');

  jwt.verify(token, 'secrectKey', (err, decoded) => {
    if (err) return res.status(401).send('Token inválido');

    const userId = decoded.id;

    db.query(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [name, email, userId],
      (err, results) => {
        if (err) {
          res.status(500).send('Erro ao atualizar dados');
          return;
        }
        res.send('Dados atualizados com sucesso');
      }
    );
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/`);
});
