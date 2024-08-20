const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const productRoutes = require('./routes/products');

const app = express();
const port = 3001;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'teste'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

app.use(cors());
app.use(bodyParser.json());
app.use('/api/products', productRoutes(db));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
