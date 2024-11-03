// controllers/userController.js
import db from '../models/index.js';

// Criar modelo principal
const User = db.users;

const addUser = async (req, res) => {
    const info = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };
    try {
        const user = await User.create(info);
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ error: "Erro cadastrando usuário", error });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json({ user });
        }
    } catch (error) {
        res.status(500).json({ error: "Erro buscando usuário", error });
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            await user.update(req.body);
            res.status(200).json({ message: 'User updated successfully', user });
        }
    } catch (error) {
        res.status(500).json({ error: "Erro atualizando usuário", error });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            await user.destroy();
            res.status(200).json({ message: 'User deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: "Erro deletando usuário", error });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ error: "Erro buscando usuários", error });
    }
};

export default {
    addUser,
    getUserById,
    updateUser,
    deleteUser,
    getAllUsers
};
