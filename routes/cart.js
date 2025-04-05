const router = require('express').Router();
const Cart = require('../models/Cart');
const {createCart,getCartItems,removeProductFromCart} = require('../controllers/cart');
const { cartItemSchema, userIdSchema, cartParamsSchema } = require('../validators/schemaValidation')
const { validateRequest } = require('../middlewares/validateRequestMiddleware')


// CREATE A CART AND ADD TO CART
router.post("/addToCart",validateRequest(cartItemSchema, 'body'), createCart);

// GET CART DETAILS
router.get("/:userId", validateRequest(userIdSchema, 'params'), getCartItems);

// REMOVE PRODUCT FROM CART
router.delete("/:userId/:productId", validateRequest(cartParamsSchema, 'params'),removeProductFromCart);

module.exports = router;