import mongoose from "mongoose";

import Product from "../models/product.model.js";

export const getProduct = async (req, res) => {
    try {
        const products = await Product.find({}); //here {} means all product
        res.status(200).json({ success: true, data: products})
    } catch (error) {
        console.l0g("Error in fectching product:", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }
};

export const createProduct = async (req, res) => {
    const product = req.body; //user will send this data

    if (!product.name || !product.price || !product.image){
        return res.status(400).json({ success:false, message: "Please provide all fields"});
    }

    const newProduct = new Product(product);
    //'Product' = model create at product.model.js. 
    //'product' = user send data

    try {
        await newProduct.save();
        res.status(201).json({ success:true, data: newProduct});
    } catch (error) {
        console.error("Error in create product: ",  error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }
};

export const updateProduct = async (req, res) => {
    const {id} = req.params;

    const product = req.body; //user upadated the data

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid product id"});
    }
    

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: true, message: "Server Error" });
    }
};

export const deleteProduct = async (req,res) => { 
    const {id} = req.params; //here id in {id} is need to same name as /api/product/:id
    //console.log("id:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid product id"});
    }
    
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product Delete"});
    } catch (error){
        console.l0g("Error in delete product:", error.message);
        res.status(500).json({ success: false, message: "Server Error"})
    }
};