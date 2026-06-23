const { Op } = require('sequelize');
const Product = require('../models/Product');
const AppError = require('../utils/AppError');

const createProduct = async ({ name, sku, description, price, category, currentStock }, userId) => {
    const existingProduct = await Product.findOne({ where: { sku } });
    if (existingProduct) {
        throw new AppError('SKU already exists', 409);
    }

    const product = await Product.create({
        name,
        sku,
        description,
        price,
        category,
        currentStock: currentStock || 0,
        createdBy: userId,
    });

    return product;
};

const getProducts = async ({ page = 1, limit = 10 }) => {
    const offset = (page - 1) * limit;

    const { count, rows } = await Product.findAndCountAll({
        limit,
        offset,
        order: [['createdAt', 'DESC']],
    });

    return {
        products: rows,
        pagination: {
            total: count,
            page: Number(page),
            totalPages: Math.ceil(count / limit),
        },
    };
};

const getProductById = async (id) => {
    const product = await Product.findByPk(id);
    if (!product) {
        throw new AppError('Product not found', 404);
    }
    return product;
};

const updateProduct = async (id, updates) => {
    const product = await Product.findByPk(id);
    if (!product) {
        throw new AppError('Product not found', 404);
    }

    if (updates.sku && updates.sku !== product.sku) {
        const skuTaken = await Product.findOne({ where: { sku: updates.sku } });
        if (skuTaken) {
            throw new AppError('SKU already exists', 409);
        }
    }

    const allowedFields = ['name', 'sku', 'description', 'price', 'category'];
    allowedFields.forEach((field) => {
        if (updates[field] !== undefined) {
            product[field] = updates[field];
        }
    });

    await product.save();
    return product;
};

const deleteProduct = async (id) => {
    const product = await Product.findByPk(id);
    if (!product) {
        throw new AppError('Product not found', 404);
    }

    await product.destroy();
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};