const asyncHandler = require('../utils/asyncHandler');
const apiResponse = require('../utils/apiResponse');
const orderService = require('../services/orderService');

const placeOrder = asyncHandler(async (req, res) => {
    const order = await orderService.placeOrder(req.user.id, req.body.items);
    apiResponse.success(res, 201, 'Order placed successfully', { order });
});

const getOrders = asyncHandler(async (req, res) => {
    const result = await orderService.getOrders(req.user.id, req.query);
    apiResponse.success(res, 200, 'Orders fetched successfully', result);
});

const getOrderById = asyncHandler(async (req, res) => {
    const order = await orderService.getOrderById(req.params.id, req.user.id);
    apiResponse.success(res, 200, 'Order fetched successfully', { order });
});

const cancelOrder = asyncHandler(async (req, res) => {
    const order = await orderService.cancelOrder(req.params.id, req.user.id);
    apiResponse.success(res, 200, 'Order cancelled successfully', { order });
});

module.exports = { placeOrder, getOrders, getOrderById, cancelOrder };