const mongoose = require('mongoose');

const connectToDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB is connected successfully');
    } catch (e) {
        console.error("MongoDB connection failed:", e);
        process.exit(1);
    }
}

module.exports = connectToDB;