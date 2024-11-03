// routes/userRouter.js
import { Router } from 'express';
import userController from '../controllers/userController.js';

const router = Router();

// Rotas
router.post('/addUser', userController.addUser);
router.get('/allUsers', userController.getAllUsers); // Corrigido para plural
router.get('/:id', userController.getUserById);
router.delete('/deleteUser/:id', userController.deleteUser); // Adicionado :id
router.put('/:id', userController.updateUser);

export default router;
