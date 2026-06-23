const express = require('express');
const router = express.Router();

const { placeOrder, getOrders, getOrderById, cancelOrder } = require('../controllers/orderController');
const { placeOrderValidator, orderIdParamValidator } = require('../validators/orderValidator');
const validateRequest = require('../middlewares/validateRequest');
const protect = require('../middlewares/authMiddleware');

router.use(protect);

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order placement and management
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Place a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [items]
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *     responses:
 *       201:
 *         description: Order placed
 *       400:
 *         description: Insufficient stock or invalid items
 *   get:
 *     summary: Get my orders (paginated)
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of orders
 */

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order detail
 */

/**
 * @swagger
 * /api/orders/{id}/cancel:
 *   post:
 *     summary: Cancel an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order cancelled
 */

router.post('/', placeOrderValidator, validateRequest, placeOrder);
router.get('/', getOrders);
router.get('/:id', orderIdParamValidator, validateRequest, getOrderById);
router.post('/:id/cancel', orderIdParamValidator, validateRequest, cancelOrder);

module.exports = router;