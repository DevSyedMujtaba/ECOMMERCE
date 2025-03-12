
const router = require('express').Router();
const Cart = require('../models/Cart');

// CREATE A CART AND ADD TO CART
router.post("/addToCart", async (req, res) => {

    try {

        let cart = await Cart.findOne({ userId: req.body.userId });

        if (!cart) {

            cart = new Cart({
                userId: req.body.userId,
                products: [],
            });
        }

        // CHECK IF PRODUCT IS ALREADY IN THE CART
        const existingProduct = cart.products.find(
            (item) => item.productId === req.body.productId
        );

        if (existingProduct) {
            existingProduct.quantity += req.body.quantity || 1;
        } else {
            cart.products.push(
                {
                    productId: req.body.productId,
                    quantity: req.body.quantity || 1,
                }
            );
        }


        await cart.save();
        res.status(201).json(cart);
    } catch (err) {
        res.status(500).json("Error while adding the cart in the Database" + err);
    }
});

// GET CART DETAILS
router.get("/getCart/:userId", async (req,res)=>{

    try {
        
        const cart = await Cart.findOne(
            {userId: req.params.userId}
        );
        if(!cart){
            res.status(404).json("Cart not found");
        } else {
            res.status(200).json(cart);
        }

    } catch (error) {
        res.status(500).json("Error while getting the cart from the database" +err);
    }
});

// REMOVE PRODUCT FROM CART
router.delete("/removeFromCart/:userId/:productId", async (req,res) => {

    try {
        const cart = await Cart.findOne({userId: req.params.userId});
        if(!cart){
            res.status(404).json("Cart not found");
        }
        cart.products = cart.products.filter(
            (item)=> item.productId !==req.params.productId
        );
        
        await cart.save();
        res.status(200).json("Product removed from the cart");
        
    } catch (error) {
        res.status(500).json("Error while removing the product from the cart" +err);
    }
});
module.exports = router;