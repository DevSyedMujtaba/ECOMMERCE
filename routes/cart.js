const router = require('express').Router();
const Cart = require('../models/Cart');
const {createCart,getCartItems,removeProductFromCart} = require('../controllers/cart');

// CREATE A CART AND ADD TO CART
router.post("/addToCart", createCart);

// GET CART DETAILS
router.get("/:userId", getCartItems);

// REMOVE PRODUCT FROM CART
router.delete("/:userId/:productId", removeProductFromCart);

module.exports = router;