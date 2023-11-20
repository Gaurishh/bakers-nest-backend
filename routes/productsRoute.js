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

module.exports = router;