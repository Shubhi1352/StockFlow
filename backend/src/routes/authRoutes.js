const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/authController');
const { registerValidator, loginValidator } = require('../validators/authValidator');
const validateRequest = require('../middlewares/validateRequest');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User registration and login
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Shubhi
 *               email:
 *                 type: string
 *                 example: shubhi@example.com
 *               password:
 *                 type: string
 *                 example: Test@1234
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error or email already exists
 */
router.post('/register', registerValidator, validateRequest, register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login and receive JWT
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: shubhi@example.com
 *               password:
 *                 type: string
 *                 example: Test@1234
 *     responses:
 *       200:
 *         description: Login successful, returns accessToken
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', loginValidator, validateRequest, login);

module.exports = router;