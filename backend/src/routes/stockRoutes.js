const express = require('express');
const router = express.Router();

const { adjustStock, getStockHistory } = require('../controllers/stockController');
const { adjustStockValidator, stockHistoryQueryValidator } = require('../validators/stockValidator');
const { productIdParamValidator } = require('../validators/productValidator');
const validateRequest = require('../middlewares/validateRequest');
const protect = require('../middlewares/authMiddleware');

router.use(protect);

router.post(
    '/:id/stock/adjust',
    productIdParamValidator,
    adjustStockValidator,
    validateRequest,
    adjustStock
);

router.get(
    '/:id/stock/history',
    productIdParamValidator,
    stockHistoryQueryValidator,
    validateRequest,
    getStockHistory
);

module.exports = router;