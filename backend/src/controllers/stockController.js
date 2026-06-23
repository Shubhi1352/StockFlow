const asyncHandler = require('../utils/asyncHandler');
const apiResponse = require('../utils/apiResponse');
const stockService = require('../services/stockService');

const adjustStock = asyncHandler(async (req, res) => {
    const product = await stockService.adjustStock(req.params.id, req.body, req.user.id);
    apiResponse.success(res, 200, 'Stock updated successfully', { product });
});

const getStockHistory = asyncHandler(async (req, res) => {
    const result = await stockService.getStockHistory(req.params.id, req.query);
    apiResponse.success(res, 200, 'Stock history fetched successfully', result);
});

module.exports = { adjustStock, getStockHistory };