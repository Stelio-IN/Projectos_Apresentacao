const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

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

// Inicia o servidor na porta 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
