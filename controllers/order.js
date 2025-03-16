const Order = require('../models/Order');

// CREATE ORDER
const createOrder = async (req, res) => {
    const newOrder = new Order({

        userId: req.body.userId,
        products: req.body.products,
        amount: req.body.amount,
        address: req.body.address,
        status: req.body.status,
    });
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (error) {
        res.status(500).json(error);
    }
}


// GET USER ORDERS
const getUserOrders = async (req,res) => {
    try {
        const orders = await Order.find({userId: req.params.userId});
        res.status(200).json(orders);
        
    } catch (err) {
        res.Status(500).json("Error while fetching orders from DataBase"+err);
        
    }
}


module.exports = {
    createOrder,
    getUserOrders
};