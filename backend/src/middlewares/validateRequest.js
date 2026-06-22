const { validationResult } = require('express-validator');
const AppError = require('../utils/AppError');

const validateRequest = (req, res, next) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        const errors = result.array().map((err) => ({
            field: err.path,
            message: err.msg,
        }));
        return next(new AppError('Validation failed', 400, errors));
    }

    next();
};

module.exports = validateRequest;