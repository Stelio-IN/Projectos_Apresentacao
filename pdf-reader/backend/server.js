const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do Multer para fazer upload de arquivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'upload')); // Define o diretório onde os arquivos serão salvos
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Define o nome do arquivo
  }
});

const upload = multer({ storage: storage });

// Rota para lidar com o upload de arquivos
app.post('/upload', upload.single('file'), (req, res) => {
  res.status(200).json({ message: 'Arquivo enviado com sucesso.' });
});

// Rota para servir arquivos estáticos (opcional, dependendo do seu projeto)
app.use(express.static(path.join(__dirname, 'public')));

// Rota para a raiz do servidor
app.get('/', (req, res) => {
  res.send('Bem-vindo ao servidor!'); // Resposta simples para a rota raiz
});

// Rota para lidar com qualquer outro caminho não definido
app.get('*', (req, res) => {
  res.status(404).send('Página não encontrada');
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
