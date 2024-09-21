"use strict";
// src/index.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const promise_1 = __importDefault(require("mysql2/promise")); // Utilize a versão com Promise
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
// Configuração da conexão com o MySQL
const db = promise_1.default.createPool({
    host: 'localhost',
    user: 'root', // Substitua pelo seu usuário do MySQL
    password: '', // Substitua pela sua senha do MySQL
    database: 'testdb', // Substitua pelo nome do seu banco de dados
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
// CRUD Endpoints
// Criar um novo usuário
app.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
    try {
        const [result] = yield db.execute(query, [name, email]);
        res.status(201).send(`Usuário adicionado com ID: ${result.insertId}`);
    }
    catch (err) {
        console.error('Erro ao inserir usuário:', err);
        res.status(500).send('Erro ao inserir usuário');
    }
}));
// Obter todos os usuários
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'SELECT * FROM users';
    try {
        const [results] = yield db.query(query);
        res.json(results);
    }
    catch (err) {
        console.error('Erro ao buscar usuários:', err);
        res.status(500).send('Erro ao buscar usuários');
    }
}));
// Obter um usuário específico pelo ID
app.get('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const query = 'SELECT * FROM users WHERE id = ?';
    try {
        const [results] = yield db.query(query, [id]);
        if (results.length === 0) {
            res.status(404).send('Usuário não encontrado');
        }
        else {
            res.json(results[0]);
        }
    }
    catch (err) {
        console.error('Erro ao buscar usuário:', err);
        res.status(500).send('Erro ao buscar usuário');
    }
}));
// Atualizar um usuário pelo ID
app.put('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, email } = req.body;
    const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
    try {
        const [result] = yield db.execute(query, [name, email, id]);
        if (result.affectedRows === 0) {
            res.status(404).send('Usuário não encontrado');
        }
        else {
            res.send('Usuário atualizado com sucesso');
        }
    }
    catch (err) {
        console.error('Erro ao atualizar usuário:', err);
        res.status(500).send('Erro ao atualizar usuário');
    }
}));
// Deletar um usuário pelo ID
app.delete('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const query = 'DELETE FROM users WHERE id = ?';
    try {
        const [result] = yield db.execute(query, [id]);
        if (result.affectedRows === 0) {
            res.status(404).send('Usuário não encontrado');
        }
        else {
            res.send('Usuário deletado com sucesso');
        }
    }
    catch (err) {
        console.error('Erro ao deletar usuário:', err);
        res.status(500).send('Erro ao deletar usuário');
    }
}));
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
