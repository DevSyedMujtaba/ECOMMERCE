const Product = require('../models/Product');


// CREATE A PRODUCT
const newProduct = async(req, res)=>{

    const newProduct = new Product({
        title: req.body.title,
        desc: req.body.desc,
        size: req.body.size,
        color: req.body.color,
        price: req.body.price,
    });

    try {
        
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);

    } catch (err) {
        res.status(201).json("Error while adding the product in the Database" +err);
        
    }

}

// GET ALL PRODUCTS
const allProducts = async(req, res)=>{

    try {

        const products = await Product.find();
        res.status(200).json(products);
        
    } catch (err) {
        res.status(500).json("Error while getting all the products from the database" +err);
    }
}

// GET A PRODUCT BY ID
const getProductById = async(req, res)=>{

    try {

        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
       
        
    } catch (err) {
        res.status(500).json("Error while getting the product from the database" +err);
    }
}

module.exports = {
    newProduct,
    allProducts,
    getProductById
}