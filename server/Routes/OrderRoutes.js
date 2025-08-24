const express = require("express")
const auth = require("../middleware/auth")
const { cashOnDeliverOrderPaymentController, paymentController, webhookStripe, getOrderDetailsController } = require("../controllers/orderController")

const orderRouter = express.Router()

orderRouter.post("/cash-on-delivery",auth,cashOnDeliverOrderPaymentController)
orderRouter.post("/checkout",auth,paymentController)
orderRouter.post("/webhook",
    express.raw({type:"application/json"}),
    webhookStripe)
orderRouter.get("/order-list",auth,getOrderDetailsController)

module.exports  = orderRouter