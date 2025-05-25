const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const helmet = require("helmet");
require("dotenv").config();
const { connectDB } = require("./config/connectDB.js")

const app = express();
const PORT = 8000 || process.env.PORT


app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}));

app.use(express.json());
app.use(cookieParser());
app.use(morgan());
app.use(helmet({
    crossOriginResourcePolicy: false
}));

app.get("/", (req, res) => {
    res.send("route is runnikl;lkjbng good gg")
})

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server is running in port ${PORT}`);
        });
    });
