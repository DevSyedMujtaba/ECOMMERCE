const router = require('express').Router();
const Product = require('../models/Product');
const {newProduct,allProducts,getProductById} = require('../controllers/product');
const localAuthMiddleware = require('../middlewares/authMiddleware');

// CREATE A PRODUCT
router.post("/", newProduct);

// GET ALL PRODUCTS
router.get("/",  allProducts); 

// GET A PRODUCT BY ID
router.get("/:id", getProductById);


module.exports = router;