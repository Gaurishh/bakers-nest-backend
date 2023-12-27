const express = require("express");
const router = express.Router();
const Product = require('../models/productModel');
const { models } = require("../db");

router.get("/getallproducts", async (req, res) => {
    try {
        const products = await Product.find({}).exec()
        res.send(products)
    } catch (error) {
        return res.status(400).json({message: error});
    }
});

router.post("/addproduct", async (req, res) => {
    const product = req.body.product

    try {
        const newProduct = new Product({
            name: product.name,
            image: product.image,
            description: product.description,
            category: product.category,
            prices: product.prices,
            varients: product.varients
        })

        console.log(newProduct);
    
        await newProduct.save()
        res.send("New Product added successfully!")
    } catch (error) {
        res.status(400).json({message: error});
    }
});

router.post("/getproductbyid", async(req, res) => {
    const productid = req.body.productid

    try {
        const product = await Product.findOne({_id: productid}).exec();
        res.send(product);
    } catch (error) {
        return res.status(400).json({message: error});
    }

})

router.post("/editproduct", async (req, res) => {
    const editedProduct = req.body.editedProduct;

    try {
        const product = await Product.findOne({_id: editedProduct._id}).exec();
        product.name = editedProduct.name
        product.description = editedProduct.description
        product.image = editedProduct.image
        product.category = editedProduct.category
        product.prices = editedProduct.prices
        product.varients = editedProduct.varients

        console.log(product);

        await product.save();

        res.send("Product edited successfully!")
    } catch (error) {
        return res.status(400).json({message: error})
    }
})

router.post("/deleteproduct", async(req, res) => {
    const productid = req.body.productid

    try {
        await Product.findOneAndDelete({_id: productid}).exec()
        res.send("Product deleted successfully!")
    } catch (error) {
        res.status(400).json({message: error});
    }
})

module.exports = router;