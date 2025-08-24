const Stripe = require("../config/stripe")
const cartModel = require("../models/cartProduct-model")
const orderModel = require("../models/order-model")
const userModel = require("../models/user-models")
const mongoose = require("mongoose")


const cashOnDeliverOrderPaymentController = async (req, res) => {
    try {
        const userId = req.userId    //auth middleware
        const { list_items, totalAmount, addressId, subTotalAmt } = req.body


        const payload = list_items.map(el => {
            return ({
                userId: userId,
                orderId: `ORD-${new mongoose.Types.ObjectId()}`,
                productId: el.productId._id,
                product_details: {
                    name: el.productId.name,
                    image: el.productId.image
                },
                paymentId: "",
                payment_status: "Cash On Delivery",
                delivery_address: addressId,
                subTotalAmt: subTotalAmt,
                totalAmt: totalAmount,

            })
        })

        const generateOrder = await orderModel.insertMany(payload)

        //remove from cart

        const removeCartItem = await cartModel.deleteMany({ userId: userId })

        const updateInUser = await userModel.updateOne({
            _id: userId
        }, { shopping_cart: [] })

        return res.json({
            message: "Order successfull",
            error: false,
            success: true,
            data: generateOrder
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

const priceWithDiscount = (price, discount = 1) => {
    const discountAmount = Math.ceil((Number(price) * Number(discount)) / 100)
    const actualPrice = Number(price) - Number(discountAmount)

    return actualPrice
}

const paymentController = async (req, res) => {
    try {
        const userId = req.userId // auth middleware
        const { list_items, totalAmount, addressId, subTotalAmt } = req.body

        const user = await userModel.findById(userId)

        const line_items = list_items.map((item => {
            return {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: item.productId.name,
                        images: item.productId.image,
                        metadata: {
                            productId: item.productId._id
                        }
                    },
                    unit_amount: priceWithDiscount(item.productId.price, item.productId.discount) * 100
                },
                adjustable_quantity: {
                    enabled: true,
                    minimum: 1
                },
                quantity: item.quantity
            }
        }))

        const params = {
            submit_type: "pay",
            mode: "payment",
            payment_method_types: ['card'],
            customer_email: user.email,
            metadata: {
                userId: userId,
                addressId: addressId
            },
            line_items: line_items,
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`
        }
        const session = await Stripe.checkout.sessions.create(params)

        return res.status(202).json(session)
    } catch (error) {
        return res.json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

const getOrderProductItems = async (
    {
        lineItems,
        userId,
        addressId,
        paymentId,
        payment_status
    }) => {

    const productList = []

    if (lineItems?.data?.length) {
        for (const item of lineItems.data) {
            const product = await Stripe.products.retrieve(item.price.product)

            const payload = {
                userId: userId,
                orderId: `ORD-${new mongoose.Types.ObjectId()}`,
                productId: product.metadata.productId,
                product_details: {
                    name: product.name,
                    image: product.images
                },
                paymentId: paymentId,
                payment_status: payment_status,
                delivery_address: addressId,
                subTotalAmt: Number(item.amount_total / 100),
                totalAmt: Number(item.amount_total / 100),
            }

            productList.push(payload)
        }
    }

    return productList

}

// http://localhost:8080/api/order/webhook

const webhookStripe = async (req, res) => {
    const event = req.body
    console.log("event data", event)
    const endPointSeceret = process.env.STRIPE_ENDPOINT_WEBHOOK_SECERET_KEY
    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            const lineItems = await Stripe.checkout.sessions.listLineItems(session.id)
            const userId = session.metadata.userId

            const orderProduct = await getOrderProductItems(
                {
                    lineItems: lineItems,
                    userId: userId,
                    addressId: session.metadata.addressId,
                    paymentId: session.payment_intent,
                    payment_status: session.payment_status,

                })

            const order = await orderModel.insertMany(orderProduct)

            if (Boolean(order[0])) {
                const removeCartItems = await userModel.findByIdAndUpdate(session.metadata.userId, {
                    shopping_cart: []
                })
                const removeCartProductDB = await cartModel.deleteMany({  userId: session.metadata.userId })
            }
            // Then define and call a method to handle the successful payment intent.
            // handlePaymentIntentSucceeded(paymentIntent);
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
}

const getOrderDetailsController = async (req,res) => {
    try {
        const userId = req.userId

        const orderList = await orderModel.find({userId : userId}).sort({createdAt : - 1 }).populate("delivery_address")

        return res.json({
            message:"Order List",
            error:false,
            success:true,
            data:orderList
        })


    } catch (error) {
        return res.status(500).json({
            message:error.message||error,
            error:true,
            success:false
        })
    }
}

module.exports = { cashOnDeliverOrderPaymentController, paymentController, webhookStripe,
    getOrderDetailsController
 }
