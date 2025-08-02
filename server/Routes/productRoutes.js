const express = require("express")
const auth = require("../middleware/auth")
const { createProductController, getProductController } = require("../controllers/productController")

const productRouter = express.Router()

productRouter.post("/create",auth,createProductController)
productRouter.post("/get",getProductController)

module.exports = productRouter
