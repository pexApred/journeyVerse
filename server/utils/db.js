const mongoose = require('mongoose');
const config = require('../config/config');

// connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(config.database.url, config.database.options);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error("Error connecting to MongoDB: ", error);
        process.exit(1);
    }
};

module.exports = connectDB;