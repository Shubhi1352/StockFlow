const express = require('express');
const router = express.Router();

const { getSummary } = require('../controllers/dashboardController');
const protect = require('../middlewares/authMiddleware');

router.use(protect);

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Summary statistics
 */

/**
 * @swagger
 * /api/dashboard/summary:
 *   get:
 *     summary: Get dashboard summary
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Summary with totalProducts, lowStockCount, totalOrders, recentActivity
 */

router.get('/summary', getSummary);

module.exports = router;