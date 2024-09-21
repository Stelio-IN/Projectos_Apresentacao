import { Router } from 'express';
import productController from '../controllers/productController.js';// Use import instead of require

const router = Router();

router.post('/addProduct', productController.addProduct);
router.get('/allProducts', productController.getAllProducts);
router.get('/product/:id', productController.getProductById);
router.get('/producte/:id', productController.getOneProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.get('/published', productController.getPublishedProducts);

export default router; // Export the router using ES module syntax
