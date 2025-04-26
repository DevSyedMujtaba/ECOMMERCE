const Product = require("../models/Product")


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
        const product = await Product.findByIdAndUpdate(id, updateData, { new: true, runValidators:true });

        //Check if product exists
        if (!product) {
            return res.status(404).json({ success: false, error: "Product not found" })
        }

        return res.status(200).json({ success: true, message: "Product updated successfully", product: product })



    } catch (err) {
        return res.status(500).json({ error: "Server error: " + err.message });
    }
}



module.exports = { getAllProducts, addProduct, softDeleteProduct, updateProduct }