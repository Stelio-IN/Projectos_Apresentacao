"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var mysql = require("mysql2/promise");
var bodyParser = require("body-parser");
var cors = require('cors');
var app = express();
var port = 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Configuração da conexão com o MySQL
var db = mysql.createPool({
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
app.post('/users', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, query, result, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email;
                query = 'INSERT INTO users (name, email) VALUES (?, ?)';
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db.execute(query, [name, email])];
            case 2:
                result = (_b.sent())[0];
                res.status(201).send("Usu\u00E1rio adicionado com ID: ".concat(result.insertId));
                return [3 /*break*/, 4];
            case 3:
                err_1 = _b.sent();
                console.error('Erro ao inserir usuário:', err_1);
                res.status(500).send('Erro ao inserir usuário');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Obter todos os usuários
app.get('/users', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, results, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = 'SELECT * FROM users';
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db.query(query)];
            case 2:
                results = (_a.sent())[0];
                res.json(results);
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                console.error('Erro ao buscar usuários:', err_2);
                res.status(500).send('Erro ao buscar usuários');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Obter um usuário específico pelo ID
app.get('/users/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, query, results, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                query = 'SELECT * FROM users WHERE id = ?';
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db.query(query, [id])];
            case 2:
                results = (_a.sent())[0];
                if (results.length === 0) {
                    res.status(404).send('Usuário não encontrado');
                }
                else {
                    res.json(results[0]);
                }
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                console.error('Erro ao buscar usuário:', err_3);
                res.status(500).send('Erro ao buscar usuário');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Atualizar um usuário pelo ID
app.put('/users/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, name, email, query, result, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, name = _a.name, email = _a.email;
                query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db.execute(query, [name, email, id])];
            case 2:
                result = (_b.sent())[0];
                if (result.affectedRows === 0) {
                    res.status(404).send('Usuário não encontrado');
                }
                else {
                    res.send('Usuário atualizado com sucesso');
                }
                return [3 /*break*/, 4];
            case 3:
                err_4 = _b.sent();
                console.error('Erro ao atualizar usuário:', err_4);
                res.status(500).send('Erro ao atualizar usuário');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Deletar um usuário pelo ID
app.delete('/users/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, query, result, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                query = 'DELETE FROM users WHERE id = ?';
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db.execute(query, [id])];
            case 2:
                result = (_a.sent())[0];
                if (result.affectedRows === 0) {
                    res.status(404).send('Usuário não encontrado');
                }
                else {
                    res.send('Usuário deletado com sucesso');
                }
                return [3 /*break*/, 4];
            case 3:
                err_5 = _a.sent();
                console.error('Erro ao deletar usuário:', err_5);
                res.status(500).send('Erro ao deletar usuário');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () {
    console.log("Servidor rodando em http://localhost:".concat(port));
});
