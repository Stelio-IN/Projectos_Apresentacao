// models/index.js
import dbConfig from '../config/dbConfig.js';
import { Sequelize, DataTypes } from 'sequelize';
import productModel from './productModel.js';
import reviewModel from './reviewModel.js';

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

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

const db = {};

// Classe Sequelize e instância
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Inicializando modelos
db.products = productModel(sequelize, DataTypes);
db.reviews = reviewModel(sequelize, DataTypes);

// Sincronizando os modelos
db.sequelize.sync({ force: false }).then(() => {
  console.log('Everything is fine, tables created');
});

// Exportando como default para usar em ES modules
export default db;
