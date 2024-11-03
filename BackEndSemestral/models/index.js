// models/index.js
import dbConfig from '../config/db.js';
import { Sequelize, DataTypes } from 'sequelize';
import userModel from './UserModel.js';

// Criação da instância de Sequelize
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});

// Testa a conexão com o banco de dados
sequelize.authenticate()
    .then(() => {
        console.log('Conectado com sucesso ao banco de dados.');
    })
    .catch(err => {
        console.error('Falha ao conectar ao banco de dados', err);
    });

const db = {};

// Classe Sequelize e instância
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Inicializando modelos
db.users = userModel(sequelize, DataTypes);

// Sincronizando os modelos
db.sequelize.sync({ force: false }).then(() => {
    console.log('Tabelas criadas com sucesso');
});

// Exportando como default para uso em ES modules
export default db;
