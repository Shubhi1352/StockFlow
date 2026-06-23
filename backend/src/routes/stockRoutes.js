const express = require('express');
const router = express.Router();

const { adjustStock, getStockHistory } = require('../controllers/stockController');
const { adjustStockValidator, stockHistoryQueryValidator } = require('../validators/stockValidator');
const { productIdParamValidator } = require('../validators/productValidator');
const validateRequest = require('../middlewares/validateRequest');
const protect = require('../middlewares/authMiddleware');

router.use(protect);

/**
 * @swagger
 * tags:
 *   name: Stock
 *   description: Stock adjustments and history
 */

/**
 * @swagger
 * /api/products/{id}/stock/adjust:
 *   post:
 *     summary: Adjust stock for a product
 *     tags: [Stock]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [type, quantity]
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [IN, OUT]
 *               quantity:
 *                 type: integer
 *               reason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Stock adjusted
 *       400:
 *         description: Insufficient stock
 */

/**
 * @swagger
 * /api/products/{id}/stock/history:
 *   get:
 *     summary: Get stock history for a product
 *     tags: [Stock]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Stock history list
 */

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