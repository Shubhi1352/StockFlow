const { Op } = require('sequelize');
const Product = require('../models/Product');
const StockHistory = require('../models/StockHistory');
const Order = require('../models/Order');

const LOW_STOCK_THRESHOLD = 10;

const getDashboardSummary = async (userId) => {
    const [totalProducts, lowStockCount, totalOrders, recentActivity] = await Promise.all([
        Product.count(),

        Product.count({
            where: {
                currentStock: { [require('sequelize').Op.lte]: LOW_STOCK_THRESHOLD },
            },
        }),

        Order.count({ where: { userId } }),

        StockHistory.findAll({
            limit: 10,
            order: [['createdAt', 'DESC']],
            include: [{ model: Product, attributes: ['id', 'name', 'sku'] }],
        }),
    ]);

    return {
        totalProducts,
        lowStockCount,
        lowStockThreshold: LOW_STOCK_THRESHOLD,
        totalOrders,
        recentActivity,
    };
};

module.exports = { getDashboardSummary };