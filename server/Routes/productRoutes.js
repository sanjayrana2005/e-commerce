const express = require("express")
const auth = require("../middleware/auth")
const { createProductController, getProductController, getProductByCategory } = require("../controllers/productController")

const productRouter = express.Router()

productRouter.post("/create",auth,createProductController)
productRouter.post("/get",getProductController)
productRouter.post("/get-product-by-category",getProductByCategory)

module.exports = productRouter
