const express = require('express');
const isAdminMiddleware = require('../middlewares/isAdminMiddleware');
const { getAllProducts,addProduct, softDeleteProduct, updateProduct, registerAdmin, adminLogin} = require('../controllers/admin');
const { productSchema,productIdSchema,} = require('../validators/schemaValidation');
const { validateRequest } = require('../middlewares/validateRequestMiddleware');

const adminRoutes = express.Router()

//ADMIN AUTH ROUTES
adminRoutes.post('/register',registerAdmin)
adminRoutes.post('/login',adminLogin)

//ADMIN PRODUCT ROUTES
// Get All Products
adminRoutes.get('/',isAdminMiddleware,getAllProducts) 
// Create a Product
adminRoutes.post('/', isAdminMiddleware,validateRequest(productSchema, 'body'),addProduct)
// Soft Delete a Product
adminRoutes.delete('/products/:id', isAdminMiddleware,validateRequest(productIdSchema, 'params'),softDeleteProduct)
// Update Product
adminRoutes.patch('/products/:id', isAdminMiddleware,validateRequest(productIdSchema, 'params'),updateProduct)

module.exports = {adminRoutes}
