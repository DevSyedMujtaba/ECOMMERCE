const router = require('express').Router();
const Order = require('../models/Order');
const {createOrder, getUserOrders} = require('../controllers/order');


//CREATE ORDER
router.post("/placeOrder", createOrder);

//GET USER ORDERS
router.get("/:userId", getUserOrders);

module.exports = router; 