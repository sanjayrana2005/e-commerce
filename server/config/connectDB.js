const mongoose = require("mongoose");
require("dotenv").config();

if (!process.env.MONGODB_URI) {
    throw new Error(
        "please provide MONGODB_URI in the .env file"
    );
}

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connected DB");
    } catch (err) {
        console.log("mongoDB connection error", err.message);
        process.exit(1);
    }
}

module.exports = connectDB 