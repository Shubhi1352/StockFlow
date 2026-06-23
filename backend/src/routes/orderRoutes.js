const express = require('express');
const router = express.Router();

const { placeOrder, getOrders, getOrderById, cancelOrder } = require('../controllers/orderController');
const { placeOrderValidator, orderIdParamValidator } = require('../validators/orderValidator');
const validateRequest = require('../middlewares/validateRequest');
const protect = require('../middlewares/authMiddleware');

router.use(protect);

router.post('/', placeOrderValidator, validateRequest, placeOrder);
router.get('/', getOrders);
router.get('/:id', orderIdParamValidator, validateRequest, getOrderById);
router.post('/:id/cancel', orderIdParamValidator, validateRequest, cancelOrder);

module.exports = router;