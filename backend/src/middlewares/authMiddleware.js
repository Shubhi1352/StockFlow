const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

const protect = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new AppError('Not authenticated', 401);
    }

    const token = authHeader.split(' ')[1];

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        throw new AppError('Invalid or expired token', 401);
    }

    const user = await User.findByPk(decoded.userId, {
        attributes: { exclude: ['password'] },
    });

    if (!user) {
        throw new AppError('User belonging to this token no longer exists', 401);
    }

    req.user = user;
    next();
});

module.exports = protect;