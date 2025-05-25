const mongoose = require("mongoose");
// const dotenv = require("dotenv");

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error(
                "please provide MONGODB_URI in the .env file"
            );
        }
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connected DB");
    } catch (err) {
        console.log("mongoDB connection error", err.message);
        process.exit(1);
    }
}

module.exports = { connectDB }