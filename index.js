const express = require('express');
const app = express();

const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const cors = require("cors");

dotenv.config();
const passport = require('passport')
const logRequest = require('./middlewares/loggingMiddleware')
const dbConnection = require('./db');
const authMiddleware = require('./middlewares/authMiddleware');


// mongoose.connect(process.env.MONGO_URL)
//   .then(() => {
//     console.log("DBConnection successful");
//     app.listen(process.env.PORT, () => { // Hard coded 5000 is replaced with the PORT. Which is coming from .env file.
//       console.log('Server is running on port 5000');
//     });
//   })
//   .catch((err) => console.log(err));

dbConnection();
app.listen(process.env.PORT, () => { // Hard coded 5000 is replaced with the PORT. Which is coming from .env file.
  console.log('Server is running on port 5000');
});


app.use(passport.initialize());
app.use(logRequest)  // We are using that logging middleware here.
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoute);
// Routes are protected by the auth middleware.
app.use("/api/product", authMiddleware, productRoute);
app.use("/api/cart", authMiddleware, cartRoute);
app.use("/api/order", authMiddleware, orderRoute);
