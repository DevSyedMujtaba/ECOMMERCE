const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const cors = require("cors");
app.use(cors());
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("DBConnection successful"))
.catch((err)=>console.log(err));

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);


app.listen(5000, () => {
  console.log('Server is running on port 5000');
});