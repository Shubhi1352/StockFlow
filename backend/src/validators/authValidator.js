const { body } = require('express-validator');

const passwordRule = body('password')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
    .withMessage('Password must be at least 8 characters and include uppercase, lowercase, number, and special character');

const registerValidator = [
    body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('email').trim().isEmail().withMessage('Must be a valid email').normalizeEmail(),
    passwordRule,
];

const loginValidator = [
    body('email').trim().isEmail().withMessage('Must be a valid email').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required'),
];

module.exports = { registerValidator, loginValidator };