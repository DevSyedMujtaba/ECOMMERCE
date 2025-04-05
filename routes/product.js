const router = require('express').Router();
const Product = require('../models/Product');
const {newProduct,allProducts,getProductById} = require('../controllers/product');
const { productSchema, productIdSchema} = require('../validators/schemaValidation');
const { validateRequest } = require('../middlewares/validateRequestMiddleware')

// CREATE A PRODUCT
router.post("/",validateRequest(productSchema, 'body'), newProduct);

// GET ALL PRODUCTS
router.get("/",  allProducts); 

// GET A PRODUCT BY ID
router.get("/:id", validateRequest(productIdSchema, 'params'), getProductById);


module.exports = router;