const { Transaction } = require('sequelize');
const sequelize = require('../config/database');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const AppError = require('../utils/AppError');
const { applyStockChange, STOCK_CHANGE_TYPES } = require('./stockService');

const placeOrder = async (userId, items) => {
    return sequelize.transaction(async (transaction) => {
        let totalAmount = 0;
        const orderItemsData = [];

        for (const item of items) {
            const product = await applyStockChange({
                productId: item.productId,
                type: STOCK_CHANGE_TYPES.ORDER,
                quantity: item.quantity,
                reason: 'Order placement',
                userId,
                transaction,
            });

            const priceAtOrder = product.price;
            totalAmount += Number(priceAtOrder) * item.quantity;

            orderItemsData.push({
                productId: item.productId,
                quantity: item.quantity,
                priceAtOrder,
            });
        }

        const order = await Order.create(
            { userId, status: 'PLACED', totalAmount },
            { transaction }
        );

        const itemsWithOrderId = orderItemsData.map((item) => ({ ...item, orderId: order.id }));
        await OrderItem.bulkCreate(itemsWithOrderId, { transaction });

        return getOrderById(order.id, userId, transaction);
    });
};

const getOrders = async (userId, { page = 1, limit = 10 }) => {
    const offset = (page - 1) * limit;

    const { count, rows } = await Order.findAndCountAll({
        where: { userId },
        include: [{ model: OrderItem, as: 'items' }],
        limit,
        offset,
        order: [['createdAt', 'DESC']],
    });

    return {
        orders: rows,
        pagination: {
            total: count,
            page: Number(page),
            totalPages: Math.ceil(count / limit),
        },
    };
};

const getOrderById = async (orderId, userId, transaction = null) => {
    const order = await Order.findOne({
        where: { id: orderId, userId },
        include: [{ model: OrderItem, as: 'items' }],
        transaction,
    });

    if (!order) {
        throw new AppError('Order not found', 404);
    }

    return order;
};

const cancelOrder = async (orderId, userId) => {
    return sequelize.transaction(async (transaction) => {
        const order = await Order.findOne({
            where: { id: orderId, userId },
            include: [{ model: OrderItem, as: 'items' }],
            transaction,
            lock: Transaction.LOCK.UPDATE,
        });

        if (!order) {
            throw new AppError('Order not found', 404);
        }

        if (order.status === 'CANCELLED') {
            throw new AppError('Order is already cancelled', 400);
        }

        for (const item of order.items) {
            await applyStockChange({
                productId: item.productId,
                type: STOCK_CHANGE_TYPES.CANCEL,
                quantity: item.quantity,
                reason: 'Order cancellation',
                userId,
                transaction,
            });
        }

        order.status = 'CANCELLED';
        await order.save({ transaction });

        return order;
    });
};

module.exports = { placeOrder, getOrders, getOrderById, cancelOrder };