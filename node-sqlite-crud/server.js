const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database(':memory:');

// Criar tabela
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY, name TEXT, description TEXT)');
});

// Rotas CRUD

// Criar item
app.post('/items', (req, res) => {
  const { name, description } = req.body;
  const stmt = db.prepare('INSERT INTO items (name, description) VALUES (?, ?)');
  stmt.run(name, description, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID });
  });
  stmt.finalize();
});

// Ler todos os itens
app.get('/items', (req, res) => {
  db.all('SELECT * FROM items', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Ler item por ID
app.get('/items/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM items WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(row);
  });
});

// Atualizar item
app.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const stmt = db.prepare('UPDATE items SET name = ?, description = ? WHERE id = ?');
  stmt.run(name, description, id, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ changes: this.changes });
  });
  stmt.finalize();
});

// Deletar item
app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare('DELETE FROM items WHERE id = ?');
  stmt.run(id, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ changes: this.changes });
  });
  stmt.finalize();
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
