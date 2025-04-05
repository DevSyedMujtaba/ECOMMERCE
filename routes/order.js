const router = require('express').Router();
const Order = require('../models/Order');
const {createOrder, getUserOrders} = require('../controllers/order');
const { orderSchema, userIdSchema } = require('../validators/schemaValidation')
const { validateRequest } = require('../middlewares/validateRequestMiddleware')

//CREATE ORDER
router.post("/placeOrder", validateRequest(orderSchema,'body'),createOrder);

//GET USER ORDERS
router.get("/:userId",validateRequest(userIdSchema,'params'), getUserOrders);

module.exports = router; 