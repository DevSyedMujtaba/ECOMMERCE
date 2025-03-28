# ECOMMERCE Backend API
THIS IS MY FIRST BACKEND PROJEECT IN NODEJS.
## 📌 Overview
This is a **Node.js & Express.js** backend for an E-commerce application with **MongoDB** as the database. It includes authentication, product management, cart functionality, and order handling.

## 🚀 Features
- **User Authentication** (Register, Login, JWT-based Authorization)
- **Product Management** (CRUD operations)
- **Cart Functionality** (Add/Remove products, Checkout)
- **Order Management**
- **Middleware for Logging Requests**
- **Secure API Routes** (Only logged-in users can access certain endpoints)

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Local & Cloud)
- **Authentication:** JSON Web Tokens (JWT)
- **Validation:** Express Validator, Joi
- **Logging:** Custom Middleware with File Logging

## 📂 Project Structure
```
ECOMMERCE/
│── controllers/       # Business logic for routes
│── middlewares/       # Authentication & Logging middleware
│── models/            # Mongoose models
│── routes/            # API route handlers
│── logs/              # Request logs
│── config/            # Database configuration
│── .env               # Environment variables
│── index.js           # Main entry point
│── package.json       # Dependencies and scripts
```

## 🔧 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/dev_mujtaba/ecommerce-backend.git
cd ecommerce-backend
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file in the root directory and add:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce  # Use your local or cloud MongoDB URL
JWT_SECRET=your_jwt_secret_key
```

### 4️⃣ Start the Server
```sh
npm start
```
Server runs on `http://localhost:5000` by default.

## 🔑 Authentication & Authorization
- **Register**: `POST /api/auth/register`
- **Login**: `POST /api/auth/login`
- **Protected Routes**: Require `Authorization: Bearer <token>`

## 🛍️ API Endpoints
### 🏷️ **Auth Routes**
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT

### 📦 **Product Routes**
- `GET /api/product/` - Get all products
- `GET /api/product/:id` - Get a product by id
- `POST /api/product/` - Add new product (Admin only)

### 🛒 **Cart Routes**
- `POST /api/cart/addToCart` - Add product to cart
- `GET /api/cart/:userId` - Get Cart Details
- `DELETE /api/cart/:userId/:productId` - Remove product from cart

### 📦 **Order Routes**
- `POST /api/placeOrder` - Place an order
- `GET /api/order/:userId` - Get user orders

## 📝 Logging
All API requests are logged in `logs/requests.log`.

## 👨‍💻 Contribution
1. Fork the repo
2. Create a new branch: `git checkout -b feature-branch`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to GitHub: `git push origin feature-branch`
5. Create a Pull Request


---

🚀 Happy Coding! If you have any issues, feel free to open an **issue** on GitHub.

