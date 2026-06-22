const asyncHandler = require('../utils/asyncHandler');
const apiResponse = require('../utils/apiResponse');
const { registerUser, loginUser } = require('../services/authService');

const register = asyncHandler(async (req, res) => {
    const user = await registerUser(req.body);
    apiResponse.success(res, 201, 'Registration successful', { user });
});

const login = asyncHandler(async (req, res) => {
    const result = await loginUser(req.body);
    apiResponse.success(res, 200, 'Login successful', result);
});

module.exports = { register, login };