const Product = require("../models/Product")
const User = require('../models/User')
const Cryptojs = require('crypto-js');
const jwt = require('jsonwebtoken');


//REGISTER ADMIN
const registerAdmin = async (req, res) => {

    try {

        const { username, email } = req.body;
        const doesExist = await User.findOne({email});
        if (doesExist) {
            return res.status(409).json({ error: "Email is already registered." });
        }
        
        const newAdmin = new User({
            username,
            email,
            password: Cryptojs.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
            role: 'admin',
        })

        const savedAdmin = await newAdmin.save();
        return res.status(201).json({ message: 'Admin Created Successfully.', savedAdmin })

    } catch (err) {
        return res.status(500).json({message: 'Internal Server Error '+err});
    }
}

// ADMIN LOGIN
const adminLogin = async (req, res) =>{
    try {
        const admin = await User.findOne({email: req.body.email, role: 'admin'})
        if(!admin){
            res.status(404).json({success: false, message: 'admin not found'})
        }

        const hashedPassword = Cryptojs.AES.decrypt(admin.password,process.env.PASS_SEC);
        const originalPassword = hashedPassword.toString(Cryptojs.enc.Utf8);

        if(originalPassword !== req.body.password){
            return res.status(401).json("Wrong password!");
        }

        // Generate Token
        const token = jwt.sign(
            {
                id: admin._id,
                email: admin.email,
                role: admin.role,
            }, process.env.JWT_SEC, { expiresIn: "3d", }
        )

        // Send Response
        res.status(200).json({
            auth: {token},
            user:{
                id: admin._id,
                email: admin.email,
                role: admin.role
            }
        })

    } catch (err) {
        res.status(500).json('Internal server error ' + err);
    }
}

// GET ALL PRODUCTS
const getAllProducts = async (req, res) => {

    try {

        const products = await Product.find({});
        res.status(200).json(products);

    } catch (err) {
        res.status(500).json("Error while getting all the products from the database" + err);
    }
}

// ADD A PRODUCT
const addProduct = async (req, res) => {
    try {
        const { title, desc, size, color, price } = req.body;
        const newProduct = new Product({ title, desc, size, color, price })
        const savedProduct = await newProduct.save();
        return res.status(201).json(savedProduct);

    } catch (err) {
        return res.status(500).json({ success: false, error: "Server error: " + err.message })
    }
}

// SOFT DELETE A PRODUCT
const softDeleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true }
        );


        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json({
            success: true,
            message: "Product soft-deleted successfully",
            product // Return the updated product for verification
        });
    } catch (err) {
        return res.status(500).json({ error: "Server error: " + err.message });
    }
};

// UPDATE A PRODUCT
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const product = await Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        //Check if product exists
        if (!product) {
            return res.status(404).json({ success: false, error: "Product not found" })
        }

        return res.status(200).json({ success: true, message: "Product updated successfully", product: product })



    } catch (err) {
        return res.status(500).json({ error: "Server error: " + err.message });
    }
}



module.exports = { getAllProducts, addProduct, softDeleteProduct, updateProduct, registerAdmin, adminLogin }