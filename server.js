const cors = require("cors");
const express = require('express');
const dotenv = require("dotenv");

const Product = require('./models/productModel');

const app = express();
const db = require("./db.js");

dotenv.config();

app.use(cors({
    origin: "*",
}));

app.use(express.json());
app.use(cors());

const productsRoute = require('./routes/productsRoute');
const ordersRoute = require('./routes/ordersRoute')

app.use('/api/products/', productsRoute)
app.use('/api/orders', ordersRoute)

app.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.send("Server working 🔥" + port);
});

const port = process.env.PORT || 8000;

app.listen(port, ()=> 'Server running on port');
