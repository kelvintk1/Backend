const mongoose = require('mongoose');

const connectToDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://tettehk537:Q1w2e3r4t5y6@cluster0.dskip37.mongodb.net/');
        console.log('MongoDB is connected successfully');
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};

module.exports = connectToDB;