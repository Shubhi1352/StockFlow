const asyncHandler = require('../utils/asyncHandler');
const apiResponse = require('../utils/apiResponse');
const productService = require('../services/productService');

const createProduct = asyncHandler(async (req, res) => {
    const product = await productService.createProduct(req.body, req.user.id);
    apiResponse.success(res, 201, 'Product created successfully', { product });
});

const getProducts = asyncHandler(async (req, res) => {
    const result = await productService.getProducts(req.query);
    apiResponse.success(res, 200, 'Products fetched successfully', result);
});

const getProductById = asyncHandler(async (req, res) => {
    const product = await productService.getProductById(req.params.id);
    apiResponse.success(res, 200, 'Product fetched successfully', { product });
});

const updateProduct = asyncHandler(async (req, res) => {
    const product = await productService.updateProduct(req.params.id, req.body);
    apiResponse.success(res, 200, 'Product updated successfully', { product });
});

const deleteProduct = asyncHandler(async (req, res) => {
    await productService.deleteProduct(req.params.id);
    apiResponse.success(res, 200, 'Product deleted successfully', null);
});

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};