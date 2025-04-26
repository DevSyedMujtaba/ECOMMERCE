const Product = require('../models/Product');
const { productSchema } = require('../validators/schemaValidation');


// CREATE A PRODUCT
const newProduct = async (req, res) => {

    try {
        const newProduct = new Product({
            title: req.body.title,
            desc: req.body.desc,
            size: req.body.size,
            color: req.body.color,
            price: req.body.price,
        });

        const savedProduct = await newProduct.save();
        console.log('Validation successful')
        res.status(201).json(savedProduct);

    } catch (err) {
        if (err.isJoi === true){
            err.status = 422
            res.status(422).json('Joi Error '+ err)
        } 
        else{
        console.error('Error saving product:', err);
        res.status(500).json('Server Error');
        }

    }

}

// GET ALL PRODUCTS
const allProducts = async (req, res) => {

    try {

        const products = await Product.find({isDeleted: false});
        res.status(200).json(products);

    } catch (err) {
        res.status(500).json("Error while getting all the products from the database" + err);
    }
}

// GET A PRODUCT BY ID
const getProductById = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);
        res.status(200).json(product);


    } catch (err) {
        res.status(500).json("Error while getting the product from the database" + err);
    }
}

module.exports = {
    newProduct,
    allProducts,
    getProductById
}