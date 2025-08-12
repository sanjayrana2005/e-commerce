const express = require("express")
const auth = require("../middleware/auth")
const { createProductController, getProductController, getProductByCategory, getProductByCategoryAndSubCategory, getProductSDetails } = require("../controllers/productController")

const productRouter = express.Router()

productRouter.post("/create",auth,createProductController)
productRouter.post("/get",getProductController)
productRouter.post("/get-product-by-category",getProductByCategory)
productRouter.post("/get-product-by-category-and-subcategory",getProductByCategoryAndSubCategory)
productRouter.post("/get-product-details",getProductSDetails)

module.exports = productRouter
