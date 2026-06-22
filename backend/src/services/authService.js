const bcrypt = require('bcryptjs');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const generateToken = require('../utils/generateToken');

const SALT_ROUNDS = 10;

const registerUser = async ({ name, email, password }) => {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new AppError('Email is already registered', 409);
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({ name, email, password: hashedPassword });

    return { id: user.id, name: user.name, email: user.email };
};

const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ where: { email } });

    // Same generic message whether email doesn't exist or password is wrong —
    // prevents attackers from discovering which emails are registered.
    if (!user) {
        throw new AppError('Invalid email or password', 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new AppError('Invalid email or password', 401);
    }

    const accessToken = generateToken(user.id);

    return {
        user: { id: user.id, name: user.name, email: user.email },
        accessToken,
    };
};

module.exports = { registerUser, loginUser };