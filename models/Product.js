const mongoose = require('mongoose');
const { type } = require('os');

//PRODUCT SCHEMA 
const ProductSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        desc: { type: String, required: true, },
        size: { type: String },
        color: { type: String},
        price: { type: Number, required: true },
        isDeleted: {type: Boolean, default: false}
        
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product",ProductSchema);