import db from '../models/index.js'; // Use import instead of require

// Create main model
const Product = db.products;
const Review = db.reviews; // Supondo que você esteja usando 'reviews' também

// 1. Create product
const addProduct = async (req, res) => {
    let info = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        published: req.body.published ? req.body.published : false
    };

    try {
        const product = await Product.create(info);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error adding product", error });
    }
};

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
};

// Get a single product by ID
const getOneProduct = async (req, res) => {
    let id = req.params.id;
    try {
        let product = await Product.findOne({ where: { id: id } });
        if (!product) return res.status(404).send('Product not found');
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product", error });
    }
};

// Get product by ID using findByPk
const getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).send('Product not found');
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product", error });
    }
};

// Update product
const updateProduct = async (req, res) => {
    let id = req.params.id;
    let info = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        published: req.body.published
    };

    try {
        let product = await Product.findByPk(id);
        if (!product) return res.status(404).send('Product not found');
        await product.update(info);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error });
    }
};

// Delete product
const deleteProduct = async (req, res) => {
    let id = req.params.id;

    try {
        let product = await Product.findByPk(id);
        if (!product) return res.status(404).send('Product not found');
        await product.destroy();
        res.status(200).send('Product deleted successfully');
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
    }
};

// Get published products
const getPublishedProducts = async (req, res) => {
    try {
        const products = await Product.findAll({ where: { published: true } });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching published products", error });
    }
};

export default {
    addProduct,
    getAllProducts,
    getOneProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    getPublishedProducts
};
