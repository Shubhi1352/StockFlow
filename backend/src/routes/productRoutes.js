const express = require('express');
const router = express.Router();

const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');

const {
    createProductValidator,
    updateProductValidator,
    productIdParamValidator,
    listProductsValidator,
} = require('../validators/productValidator');

const validateRequest = require('../middlewares/validateRequest');
const protect = require('../middlewares/authMiddleware');

router.use(protect);

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, sku, price, currentStock]
 *             properties:
 *               name:
 *                 type: string
 *               sku:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               currentStock:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Product created
 *       400:
 *         description: Validation error or duplicate SKU
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products (paginated)
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Items per page
 *     responses:
 *       200:
 *         description: List of products
 */

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product detail
 *       404:
 *         description: Product not found
 *   put:
 *     summary: Update product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated
 *   delete:
 *     summary: Delete product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product deleted
 */

router.post('/', createProductValidator, validateRequest, createProduct);
router.get('/', listProductsValidator, validateRequest, getProducts);
router.get('/:id', productIdParamValidator, validateRequest, getProductById);
router.put('/:id', productIdParamValidator, updateProductValidator, validateRequest, updateProduct);
router.delete('/:id', productIdParamValidator, validateRequest, deleteProduct);

module.exports = router;