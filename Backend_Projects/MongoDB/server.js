require("dotenv").config();
const mongoose = require('mongoose');
const express = require('express');
const productRoutes = require('./routes/product-routes');
const bookRoutes = require('./routes/Book-routes'); // Assuming you have a book routes file

const app = express();

// connect to our database
mongoose.connect(process.env.MONGO_URI).then(()=> console.log('MongoDB connected successfully')).catch(e=>console.log(e));

// use middlewares
app.use(express.json());
app.use('/products', productRoutes);
app.use('/reference', bookRoutes); // Use the book routes under the '/reference' path

app.listen(process.env.PORT,()=> {
    console.log(`Server is now running on port ${process.env.PORT}`)})