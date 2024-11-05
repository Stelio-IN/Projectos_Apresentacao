
import db from '../models/index.js';

const User = db.User;

const createUser = async(req,res) =>{
    try{
        const user = await User.create(req.body);
        res.status(201).json(user);
    }catch(error){
        res.status(500).json({error: error.message});
    }
};

// Obter modelo principal por ID

const getUserById = async(req,res) =>{
    try{
        const user = await User.findByPk(req.params.id);
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({error: error.message});
    }
};

// Atualizar modelo principal por ID

const updateUser = async(req,res) =>{
    try{
        const user = await User.findByPk(req.params.id);
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        await user.update(req.body);
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({error: error.message});
    }
};

// Deletar modelo principal por ID

const deleteUser = async(req,res) =>{
    try{
        const user = await User.findByPk(req.params.id);
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        await user.destroy();
        res.status(204).send();
    }catch(error){
        res.status(500).json({error: error.message});
    }
};

// Obter todos os modelos principais

const getAllUsers = async(req,res) =>{
    try{
        const users = await User.findAll();
        res.status(200).json(users);
    }catch(error){
        res.status(500).json({error: error.message});
    }
};


export default {
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    getAllUsers
};
