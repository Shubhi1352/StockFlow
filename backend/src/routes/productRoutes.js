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

router.post('/', createProductValidator, validateRequest, createProduct);
router.get('/', listProductsValidator, validateRequest, getProducts);
router.get('/:id', productIdParamValidator, validateRequest, getProductById);
router.put('/:id', productIdParamValidator, updateProductValidator, validateRequest, updateProduct);
router.delete('/:id', productIdParamValidator, validateRequest, deleteProduct);

module.exports = router;