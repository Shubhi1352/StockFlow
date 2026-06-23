const { body, param, query } = require('express-validator');

const createProductValidator = [
    body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('sku').trim().isLength({ min: 2 }).withMessage('SKU is required'),
    body('description').optional().trim(),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be a number greater than 0'),
    body('category').optional().trim(),
    body('currentStock')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Initial stock must be a non-negative integer'),
];

const updateProductValidator = [
    body('name').optional().trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('sku').optional().trim().isLength({ min: 2 }).withMessage('SKU cannot be empty'),
    body('description').optional().trim(),
    body('price').optional().isFloat({ gt: 0 }).withMessage('Price must be a number greater than 0'),
    body('category').optional().trim(),
];

const productIdParamValidator = [
    param('id').isInt().withMessage('Product id must be a valid integer'),
];

const listProductsValidator = [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
];

module.exports = {
    createProductValidator,
    updateProductValidator,
    productIdParamValidator,
    listProductsValidator,
};