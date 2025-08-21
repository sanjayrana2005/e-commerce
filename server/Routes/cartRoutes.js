const express = require("express")
const auth = require("../middleware/auth")
const { addToCartController, getItemController, updateCartItemQuantityController, deleteCartItemQuantityController } = require("../controllers/cartController")

const cartRouter = express.Router()

cartRouter.post("/create",auth,addToCartController)
cartRouter.get("/get",auth,getItemController)
cartRouter.put("/update-quantity",auth,updateCartItemQuantityController)
cartRouter.delete("/delete-cart-item",auth,deleteCartItemQuantityController)

module.exports = cartRouter 