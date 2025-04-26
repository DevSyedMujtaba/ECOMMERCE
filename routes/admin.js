const express = require('express');
const isAdminMiddleware = require('../middlewares/isAdminMiddleware');
const { getAllProducts,addProduct, softDeleteProduct, updateProduct} = require('../controllers/admin');
const { productSchema,productIdSchema,} = require('../validators/schemaValidation');
const { validateRequest } = require('../middlewares/validateRequestMiddleware');

const adminRoutes = express.Router()


adminRoutes.get('/products',isAdminMiddleware,getAllProducts)
adminRoutes.post('/products', isAdminMiddleware,validateRequest(productSchema, 'body'),addProduct)
adminRoutes.delete('/products/:id', isAdminMiddleware,validateRequest(productIdSchema, 'params'),softDeleteProduct)
adminRoutes.patch('/products/:id', isAdminMiddleware,validateRequest(productIdSchema, 'params'),updateProduct)

module.exports = {adminRoutes}
