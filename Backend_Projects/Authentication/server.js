require('dotenv').config();
const express = require('express');
const connectToDB = require('./database/db');
const authRoutes = require('./Routes/Auth-routes');
const homeRoutes = require('./Routes/home-routes'); // Assuming you have a home route for the homepage
const adminRoutes = require('./Routes/admin-routes'); // Assuming you have an admin route for admin functionalities
const uploadImageRoutes = require('./Routes/image-routes'); // Assuming you have an admin route for admin functionalities
// Connect to the database

connectToDB();

const app = express();
const PORT = process.env.PORT || 3000;
  
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use('/api/auth', authRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/image', uploadImageRoutes);

app.listen(PORT, () => {
  console.log(`Server is now listening to PORT: ${PORT}`);
});