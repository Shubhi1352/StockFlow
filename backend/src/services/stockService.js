const { Transaction } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('../models/Product');
const StockHistory = require('../models/StockHistory');
const AppError = require('../utils/AppError');

const STOCK_CHANGE_TYPES = {
    IN: 'IN',
    OUT: 'OUT',
    ORDER: 'ORDER',
    CANCEL: 'CANCEL',
};

const INCREASING_TYPES = [STOCK_CHANGE_TYPES.IN, STOCK_CHANGE_TYPES.CANCEL];

const applyStockChange = async ({ productId, type, quantity, reason, userId, transaction }) => {
    const product = await Product.findByPk(productId, {
        transaction,
        lock: Transaction.LOCK.UPDATE,
    });

    if (!product) {
        throw new AppError('Product not found', 404);
    }
    const qty = Number(quantity);
    if (Number.isNaN(qty)) {
        throw new AppError('Quantity must be a valid number', 400);
    }
    if (qty <= 0) {
        throw new AppError('Quantity must be positive', 400);
    }
    const previousStock = product.currentStock;
    const isIncrease = INCREASING_TYPES.includes(type);
    const newStock = isIncrease ? previousStock + qty : previousStock - qty;

    if (newStock < 0) {
        throw new AppError('Insufficient stock for this operation', 400);
    }

    product.currentStock = newStock;
    await product.save({ transaction });

    await StockHistory.create(
        { productId, type, quantity, previousStock, newStock, reason, performedBy: userId },
        { transaction }
    );

    return product;
};

const adjustStock = async (productId, { type, quantity, reason }, userId) => {
    return sequelize.transaction((transaction) =>
        applyStockChange({ productId, type, quantity, reason, userId, transaction })
    );
};

const getStockHistory = async (productId, { page = 1, limit = 10 }) => {
    const product = await Product.findByPk(productId);
    if (!product) {
        throw new AppError('Product not found', 404);
    }

    const offset = (page - 1) * limit;
    const { count, rows } = await StockHistory.findAndCountAll({
        where: { productId },
        limit,
        offset,
        order: [['createdAt', 'DESC']],
    });

    return {
        history: rows,
        pagination: {
            total: count,
            page: Number(page),
            totalPages: Math.ceil(count / limit),
        },
    };
};

module.exports = { applyStockChange, adjustStock, getStockHistory, STOCK_CHANGE_TYPES };