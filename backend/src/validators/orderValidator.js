const { body, param } = require('express-validator');

const placeOrderValidator = [
    body('items')
        .isArray({ min: 1 })
        .withMessage('Order must contain at least one item'),
    body('items.*.productId')
        .isInt({ gt: 0 })
        .withMessage('Each item must have a valid productId'),
    body('items.*.quantity')
        .isInt({ gt: 0 })
        .withMessage('Each item quantity must be a positive integer'),
];

const orderIdParamValidator = [
    param('id').isInt().withMessage('Order id must be a valid integer'),
];

module.exports = { placeOrderValidator, orderIdParamValidator };