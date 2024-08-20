const express = require('express');

const productRoutes = (db) => {
  const router = express.Router();

  // Create
  router.post('/', (req, res) => {
    const product = req.body;
    const query = 'INSERT INTO products SET ?';
    db.query(query, product, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });

  // Read
  router.get('/', (req, res) => {
    const query = 'SELECT * FROM products';
    db.query(query, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  });

  // Update
  router.put('/:id', (req, res) => {
    const product = req.body;
    const query = 'UPDATE products SET ? WHERE id = ?';
    db.query(query, [product, req.params.id], (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });

  // Delete
  router.delete('/:id', (req, res) => {
    const query = 'DELETE FROM products WHERE id = ?';
    db.query(query, [req.params.id], (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });

  return router;
};

module.exports = productRoutes;
