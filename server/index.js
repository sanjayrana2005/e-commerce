const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const morgan = require("morgan");
const helmet = require("helmet");
require("dotenv").config();
const connectDB = require("./config/connectDB");
const userRouter = require("./Routes/userRoute");
const categoryRouter = require("./Routes/categoryRout");
const uploadRouter = require("./Routes/uploadRoute");
const subCategoryRouter = require("./Routes/subCategoryRoute");
const productRouter = require("./Routes/productRoutes");
const cartRouter = require("./Routes/cartRoutes");
const addressRouter = require("./Routes/addressRoute");
const orderRouter = require("./Routes/OrderRoutes")

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
    res.json({
        message: "route is working " + PORT,
    });
});

app.use("/api/user",userRouter);
app.use("/api/category",categoryRouter)
app.use("/api/file",uploadRouter)
app.use("/api/subcategory",subCategoryRouter)
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)
app.use("/api/address",addressRouter)
app.use("/api/order",orderRouter)

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server is running in port ${PORT}`);
        });
    });
