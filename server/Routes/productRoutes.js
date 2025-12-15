const express = require("express")
const auth = require("../middleware/auth")
const { createProductController, getProductController, getProductByCategory, getProductByCategoryAndSubCategory, getProductSDetails, updateProduct, deleteProduct, searchProduct } = require("../controllers/productController")
const admin = require("../middleware/Admin")

const productRouter = express.Router()

productRouter.post("/create",auth,admin,createProductController)
productRouter.post("/get",getProductController)
productRouter.post("/get-product-by-category",getProductByCategory)
productRouter.post("/get-product-by-category-and-subcategory",getProductByCategoryAndSubCategory)
productRouter.post("/get-product-details",getProductSDetails)

// update products details
productRouter.put("/update-product-details",auth,admin,updateProduct)

//delete product
productRouter.delete("/delete-product",auth,admin,deleteProduct)

//search Products

productRouter.post("/search-product",searchProduct)

module.exports = productRouter
