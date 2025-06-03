require("dotenv").config();
const mongoose = require('mongoose');
const express = require('express');
const productRoutes = require('./routes/product-routes');
    
const app = express();

// connect to our database
mongoose.connect(process.env.MONGO_URI).then(()=> console.log('MongoDB connected successfully')).catch(e=>console.log(e));

// use middlewares
app.use(express.json());
app.use('/products', productRoutes);

app.listen(process.env.PORT,()=> {
    console.log(`Server is now running on port ${process.env.PORT}`)})